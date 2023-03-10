import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutPublic } from "~/containers/Layout";
import { ResetPassword } from "~/containers/ResetPassword";
import { FlexWrapper } from "~/components/Grid";
import { Helmet } from "react-helmet";
import useSearchParams from "~/hooks/useSearchParams";
import { SkipToContent } from "~/components";

function ResetPasswordPage() {
  const { token } = useSearchParams();
  return (
    <>
      <Helmet>
        <title>Modifier votre mot de passe | e-MJPM </title>
      </Helmet>
      <SkipToContent skipTo="reset_password" />
      <LayoutPublic>
        <FlexWrapper
          mt={6}
          px="1"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <HeadingTitle>Modifier votre mot de passe</HeadingTitle>
          <ResetPassword token={token} mt="3" />
        </FlexWrapper>
      </LayoutPublic>
    </>
  );
}

export default ResetPasswordPage;
