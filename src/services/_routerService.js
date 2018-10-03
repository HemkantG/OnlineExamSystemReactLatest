// routes
import Widgets from "Routes/widgets";
import Pages from "Routes/pages";
import AdvanceUIComponents from "Routes/advance-ui-components";
import CalendarComponents from "Routes/calendar";
import ChartsComponents from "Routes/charts";
import FormElements from "Routes/forms";
import Components from "Routes/components";
import Tables from "Routes/tables";
import Icons from "Routes/icons";
import DragAndDrop from "Routes/drag-drop";
import Dropzone from "Routes/dropzone";

// async component
import {
  AsyncAboutUsComponent,
  AsyncMailComponent
} from "Components/AsyncComponent/AsyncComponent";

export default [
  {
    path: "widgets",
    component: Widgets
  },
  {
    path: "icons",
    component: Icons
  },
  {
    path: "about-us",
    component: AsyncAboutUsComponent
  },
  {
    path: "pages",
    component: Pages
  },
  {
    path: "mail",
    component: AsyncMailComponent
  },
  {
    path: "charts",
    component: ChartsComponents
  },
  {
    path: "tables",
    component: Tables
  },
  {
    path: "ui-components",
    component: Components
  },
  {
    path: "advanced-component",
    component: AdvanceUIComponents
  },
  {
    path: "drag-andDrop",
    component: DragAndDrop
  },
  {
    path: "forms",
    component: FormElements
  },
  {
    path: "calendar",
    component: CalendarComponents
  },
  {
    path: "image-cropper",
    component: ImageCropper
  },
  {
    path: "video-player",
    component: VideoPlayer
  },
  {
    path: "dropzone",
    component: Dropzone
  }
];
