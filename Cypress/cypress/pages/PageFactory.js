import { CreateSiteStepOneV3, CreateSiteStepOneV4 } from "./CreateSitePage";
import SignInPage from "./SignInPage";

class PageFactory {
    constructor(ghostVersion) {
        this.ghostVersion = ghostVersion;
    }

    createSitePage() {
        if (this.ghostVersion.startsWith('Ghost 3'))
            return new CreateSiteStepOneV3();
        else if (this.ghostVersion.startsWith('Ghost 4'))
            return new CreateSiteStepOneV4();
        else
            throw "Unsupported version";
    }

    signInPage() {
        return new SignInPage();
    }
}
    
export default PageFactory;
