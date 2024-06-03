import DefaultLayout from "../Component/Layout/DefaultLayout";
import ModalCreateQRCode from "../Component/Modal/ModalQRCode/ModalCreateQRCode";
import HomePage from "../Page/HomePage";
import Login from "../Page/Login";
import PageClassroom from "../Page/PageClassroom";
import PageFaceRecognition from "../Page/PageFaceRecognition";
import PageQrCode from "../Page/PageQrCode";
import PageStatisticFaceRecogniton from "../Page/PageStatisticFaceRecogniton";
import PageStudentManager from "../Page/PageStudentManager";
import StudentsInClassroom from "../Page/StudentsInClassroom";
import Test from "../Page/Test";

const { createBrowserRouter } = require("react-router-dom");


export const routerPage = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <DefaultLayout />,
    children: [
      { path: "student-manager", element: <PageStudentManager /> },
      { path: "classroom-manager", element: <PageClassroom /> },
      { path: "student-manager/students", element: <StudentsInClassroom /> },
      {
        path: "qr-code",
        children: [
          { path: "home", element: <PageQrCode /> },
          { path: "create", element: <ModalCreateQRCode /> },
        ],
      },{
        path: "test",
        element :<Test/>
      },
      {
        path: "face-recognition/",
        children: [
          { path: "home", element: <PageFaceRecognition /> },
          { path: "statistic", element: <PageStatisticFaceRecogniton /> },
        ],
      }
    ],
  },
]);
