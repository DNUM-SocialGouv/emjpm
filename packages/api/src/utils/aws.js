const fs = require("fs");
const {
  ListObjectsV2Command,
  CreateBucketCommand,
  GetBucketAclCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  S3Client,
} = require("@aws-sdk/client-s3");
const config = require("~/config");
const { Upload } = require("@aws-sdk/lib-storage");
const logger = require("~/utils/logger");

const createBlobService = () => {
  const s3config = {
    accelerate: false,
    disableMultiRegionAccessPoints: false,
    endpoint: config.awsEndpoint,
    forcePathStyle: true,
    region: "aws-global",
    useArnRegion: true,
    useDualStack: false,
    useFIPS: false,
    useGlobalEndpoint: false,
    credentials: {
      accessKeyId: config.awsAccessKey,
      secretAccessKey: config.awsSecretAccess,
    },
  };

  return new S3Client(s3config);
};

const getBlobContainer = async (containerName) => {
  const service = createBlobService();
  let response;
  const command = new GetBucketAclCommand({
    Bucket: containerName,
  });
  try {
    response = await service.send(command);
    return containerName;
  } catch (err) {
    console.error(err);
  }
  logger.info(`[OCMI] Getting container :`, containerName, response);
  return response;
};

const createBlobContainer = async (containerName) => {
  const service = createBlobService();
  const command = new CreateBucketCommand({
    // The name of the bucket. Bucket names are unique and have several other constraints.
    // See https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html
    Bucket: containerName,
  });
  try {
    await service.send(command);
  } catch (err) {
    console.error(err);
  }
};

const listBlobsOrderByLastModifiedDesc = async (container) => {
  const service = createBlobService();
  const command = new ListObjectsV2Command({
    Bucket: container,
  });
  const contentsToReturn = []; //sorted & transformed list of items
  try {
    let isTruncated = true;
    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await service.send(command);
      Contents.map((c) => {
        contentsToReturn.push({
          name: c.Key,
          properties: {
            contentLength: c.Size,
            contentType: undefined,
            createdOn: undefined,
            lastModified: c.LastModified,
          },
        });
      });
      isTruncated = IsTruncated;
      command.input.ContinuationToken = NextContinuationToken;
    }
    contentsToReturn.sort(function (a, b) {
      return (
        new Date(b.properties.lastModified) -
        new Date(a.properties.lastModified)
      );
    });
  } catch (err) {
    console.error(err);
  }
  return contentsToReturn;
};

const getBlobProperties = async (container, blobName) => {
  const service = createBlobService();
  let response;
  const command = new GetObjectCommand({
    Bucket: container,
    Key: blobName,
  });
  try {
    response = await service.send(command);
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    response = await response.Header.transformToString();
  } catch (err) {
    console.error(err);
  }
  return response;
};

const createBlob = async (container, blobName, filePath) => {
  const service = createBlobService();
  const fileStream = fs.createReadStream(filePath);
  try {
    const upload = new Upload({
      client: service,
      params: {
        Body: fileStream,
        Bucket: container,
        Key: blobName,
      },
    });
    upload.on("httpUploadProgress", (progress) => {
      console.log(progress);
    });
    await upload.done();
  } catch (e) {
    console.log(e);
  }
};

// eslint-disable-next-line no-unused-vars
const readBlob = async (container, blobName, fileSize) => {
  const service = createBlobService();
  const command = new GetObjectCommand({
    Bucket: container,
    Key: blobName,
  });
  let stringBlobContents;
  try {
    const response = await service.send(command);
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    stringBlobContents = await response.Body.transformToByteArray();
  } catch (err) {
    console.error(err);
  }
  logger.info(`[OCMI] Getting contents of file:`, blobName, stringBlobContents);
  return stringBlobContents;
};

const streamBlob = async (container, blobName) => {
  const service = createBlobService();
  const command = new GetObjectCommand({
    Bucket: container,
    Key: blobName,
  });
  let stringBlobContents;
  try {
    stringBlobContents = await service.send(command);
  } catch (err) {
    console.error(err);
  }
  return stringBlobContents;
};

const deleteBlob = async (container, blobName) => {
  const service = createBlobService();
  const command = new DeleteObjectCommand({
    Bucket: container,
    Key: blobName,
  });
  try {
    const response = await service.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createBlob,
  createBlobContainer,
  deleteBlob,
  getBlobContainer,
  getBlobProperties,
  listBlobsOrderByLastModifiedDesc,
  readBlob,
  streamBlob,
};
