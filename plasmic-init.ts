import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import {AuthUiForm, AuthUiButton} from "./components/AuthUi";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "jwUQnQ6rgJe4v5GYJqEzaq",
      token: "IKNU4uPNl59LamffNpjRmWtV7q6stvvSJbt71bnSgEnJVX9yKR5mgQvQoEvRp3YsEUGAqNfPpPL1xN6E5c5bA",
    },
  ],

  // By default Plasmic will use the last published version of your project.
  // For development, you can set preview to true, which will use the unpublished
  // project, allowing you to see your designs without publishing.  Please
  // only use this for development, as this is significantly slower.
  preview: true,
});

// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-host

PLASMIC.registerComponent(AuthUiForm, {
  name: "Auth UI Sign Form",
  props: {},
});
PLASMIC.registerComponent(AuthUiButton, {
  name: "Auth UI Button",
  props: {},
});
