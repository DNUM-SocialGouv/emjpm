import useSearchParams from "~/hooks/useSearchParams";
import { Helmet } from "react-helmet";

import { LayoutPublic } from "~/containers/Layout";
import { SignupContextProvider } from "~/containers/Signup/context";
import { SignupServiceInvitation } from "~/containers/Signup/SignupServiceInvitation";
import { SignupAdminInvitation } from "~/containers/Signup/SignupAdminInvitation";
import { BoxWrapper } from "~/components/Grid";
import { SkipToContent } from "~/components";

function SignupInvitationPage() {
  const { type, token } = useSearchParams();
  return (
    <>
      <Helmet>
        <title>Invitation pour la création d'un compte | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="invitation_wrapper" />
      <SignupContextProvider>
        <LayoutPublic>
          <BoxWrapper pt="6" px="1" id="invitation_wrapper">
            {type === "service " && <SignupServiceInvitation token={token} />}
            {type === "admin" && <SignupAdminInvitation token={token} />}
          </BoxWrapper>
        </LayoutPublic>
      </SignupContextProvider>
    </>
  );
}

export default SignupInvitationPage;
