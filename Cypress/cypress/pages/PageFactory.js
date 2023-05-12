import { CreateSiteStepOneV3, CreateSiteStepOneV4 } from "./CreateSitePage";
import Modal from "./Modal";
import { NavigationV3, NavigationV4 } from "./Navigation";
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
    
    navigation() {
        if (this.ghostVersion.startsWith('Ghost 3'))
            return new NavigationV3();
        else if (this.ghostVersion.startsWith('Ghost 4'))
            return new NavigationV4();
        else
            throw "Unsupported version";
    }

    modal() {
        return new Modal();
    }
}
    
export default PageFactory;
