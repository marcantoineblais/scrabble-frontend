
import { ImageResponse } from "next/server"
import CheetahLogo from "./components/CheetahLogo"

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
    width: 64,
    height: 64,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse((
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgb(255 237 213)", color: "rgb(6 78 59)", borderRadius: "50%" }} >
            <svg style={{ width: "100%", height: "100%", objectFit: "contain" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 559 701"><path fill="currentColor" d="M228.33,355.6c-10.89-16.86-9,5.75-14.43,8.24-6.82,5.38,3.48,12.18,5.49,16.83-12.95,5.06.62,3.19-9,9.78,13.53-3.31,14,7.7,1.42,10.23-4.89,6-6.12,18-10.79,26.66,3.05,5.66.87,11,4,17.08,5.81,7.53-16.06,8.95-6,13.29,4.86,2.27-.5,14-3.72,12.09-.4,7.83,3.15,15.95-1.08,22.87,8.5,1.45,36.74-14.07,30.75-18.6,15.65.31-.54,10.55,17.22,12.05-3.44,6.71-2.6,7.3,3.51,11.83-1.11,4.92-6.17,3.92-8.67.31-9.57-3.26-2.95,4.27,1,7.36-11.53.14-21.27,22-1.87,5,2.08,2.66-4.15,3.93-4.29,6.93,1.36,1.94,12.14,5.87,4.39,7.76-1.79-2.7-3.9-5.53-7.54-2.91-4.63,10,1.44,9.21,9.16,10.75-22.88,42.9-30-19.23-37.62,32.41-7,8.13-3.8,21.73,8,20-4.71-4-6.44-9.48,2.68-8.82,6.94.24,11.86-7.05,16.28-11.56,1.91-5.62-6.91-4,1.16-13.69,8.32,13,16,17,24.3,6.09-4.08,14.52,16.87,4.85,20.4,10,4.24,5.94,8.23-5.44,12.44-6.93,3.09-2.31,6.32-2.92,9.15.88,7.72,2.09,15.41,2.7,23.92.42-4.53,9.06,13.66,10.68,9.66,6.58-12.59-27.46,28.92-34.35,9.57,19.61-13.11,12.83-34.54,29.74-37.14,37.67-9.59,6.18-26,14.83-28.07,26.59.3,1.49-.76,3.2-1.4,5.51,10.84-3.62,12.07,7,18.59,9.8,7.55-9.18,11.15,1.31,19.52.17,4.61,2.07,28.55,2.61,18.75,9.66-10.4,5.56-64.86-3.55-40.3,13.26-5.41-1.1-12,3.26-11.46-4.74-.94-4.41-5.41-2.19-8.41-1.93.37,2.76,5.49,3.1,5.21,6.83-4.12,5-22-3.67-10-7.1-10.41-5.08-23-1-34.48-1.82-6.63-1.27-9.84,2-14.92,5.55,2.75-17.62,27.73-17.43,46.13-26.73,7.48-2.8,8.42-9.72,1.69-16.69-2.38,7.48-6.35,8.51-3.62-3.09-15.72-9.31-27.8-20.81-41.82-30.46-6.53-8.1-18.57-7.8-21.5-16.33-4.77-19.42-18.29-35.56.29-47-4.31-5.25-1-9-3.9-13.73C181.35,529,181,518,170.93,514.29c-12.28-5.85,2.55-21.78-16,2.15a148.36,148.36,0,0,1-26.39,15.22c-5.31-5.55-26.19-6.07-8.48-11.15-8.64-3.59-6.19-3.3,1.3-4.54-1.17-5.72-13.29-2.66-2.48-9.46-17.43-5.59-9.12-4.65,4.33-10.79-11-20.29,45.91-38.35,18.69-76.43-2.26-3.56-7-1.28-9.58.64-6.52,1.43-11.16.11-18.45,2.37-4.16-3.93-9.74-2.74-15.73-3.18,10.56-6.37-6.42-6-10.21-10.66-5.73-8.84-12.38-1.77-6,4.43-16.81,7.76-.58,12.7,12.3,16.25,3.62,13,26-2.77,2.21,17.3-1.7,1.29-3.91,1.93-5.37-1.79-5.28-7.72-19-5-27.35-8,8.24-4.34,4.69-3.07-2.48-9.27,6.66-4.86,11.25-8.39.24-9.59,2.16-5.35-5.45-8.05,5.83-13.42,4.59.2,8.8,3.53,11.85-1.48,1.16-8.27-13.17-16.4-13.46-26.67-.91-2.95-4.88-14.06-8-7.1-.4,5.55-11.11,2.56-1.52,10.08-8.19,2.94-27.24.41-27.55,11,1.76,4.85-3.29,3.89-6.13,2.17,3.47,13.78-11.91,10.51-3.62-.52,20-22.25,20.56.21,24.28-30.25,31.55-29.84,105.55-10.94,69-29.08a43.65,43.65,0,0,1,23.85.42c1,5.4-10.55,5.24-7.06,12.87,7.39-4.06,13.65-8.93,10.74-18-2.58-4,1.48-8.08-3.7-10.86-.62-.38-.59-3,.12-3.59,5.76-6.47-8.65-17.88,9-11.49-2.35-10-14.2-6.22-12.53-20.89,26.65-3.51-5-9.67,6.86-18.22,19.66,33.81,24.26,3-5.71-9,9.35,0,12.58-3.72,11.91-12.95,12.27,1.87-1.17-18.15,13.24-13.07,4.76-2.33,10.86,24.52,14.84,3.9-1.2-8.56,10,.33,12.24-6.32,6-7.91,10.85,7.83,8.89,12.54-4.15,24.47-.29,8.66-10.23,9-3.43,3.46-5.23.66-8.67-1.33,19.2-1.81-26.31-12.59,12,13.94,17.74,10.27-13.9,14.77-3.21,25.81,2.65,3.4-1,5.07-3.72,4.77-10.08-2.74-11.49,17.43,3.55,3.26-1.86,6-.84,10.19,4,14.3,2.72-5.87,2.35-12.72,9.25-8.24-10.65,5.33,10.47,9.29-.74,13.42-17.13,1.16-6.07,11.91,4.7,4.48,4.37-2.21,13.62,4.39,13.27-4.82,7.42,12.33,31.71-15.6,17,7.18,7.76,2.87,7.9-7.06,12.38-11-8.3-11.54-27.31,5.54-26.33-4.59,2.83-4.91,6.19-6.46,12.49-3.68-1.37-3.43-3.09-6.09-6.27-6.26-7.76-2.1-7,8.42-12.77,12.37-9.8-2.86-9.81-2.87-10.28-8.13,10.71-1.25.11-4.75-.33-9.64,3.63-2.51,17-9.05,5-9.16-1.14-10.5,18.12-18.25,11.8-30.23-4,1.79-11.62,2.85-11,7.89-4.32,15-3.78-3.74-3.59-10.9,9.38,7.42-2.1-7,11.4-7-4.47-12,3.22-22.36,10-31.75,6.15-11.06-16.87-4.85-5.1-21.5,1.56-9.68,6.41-29.69-7.27-34.49-22.86,19.51,17-5-5.67,23.2,2.77-10.41-5.52-7.92-8.38-17.75,1.87-19.92,34-10.65,27.87-20.8,9.8-11.35,30.41,23.5,10.08,12.4-3.59,13.51,17.15,17,8.3,29.54,5.53,8,16.23-33,5.74-17.17-6.29-6.21,6.51-24.3,11.26-11.83,10.09-6.77.65,9.52,0,14.4-1.23,5,2.48,10.47-2.41,14.59-4.79,5.37,7,10.05,1.72,16.69.1,18.89-18-2.24-5.36,20,3.78,7.58-5.55,10.88,8,5.42,12.2,4.2,1.8,22.84,17.42,24.43-4.88,9.32,1.45,18.34,11.58,13.74-1.48-6.82-11.84-3.8-11.09-13,2.65-5.44,4-9.64,14.45-9.16,10.45-.22,4.91-15.87,16.18-12.42,2.65-6.19,3.17-6.29,5,.38,6.7,10.3,6.54-9.75,11.73-7.55-6.84,29.92,28.78,1.58,18.89-11.87.71,12.59-12.7-2-7.06-5.86,2.29-1.63,1.24-3.47-1.3-4-9.35-4.14-9.07,12.19-16.49,5.49-3.88,8.06-8.13,17.52-18.25,19.51,13.73-15.38-.12-27.83-6.49-46.66,5.62-1.06,5.82,11.17,14.42,7.22,12.5,7.66,13.15-1.88,17-10-1.59-7.78-14.28-14.53-3.45-20.83,12-9.17,26.31,3.57,22.32-13.78,19.6,6.93,14.49,9.53,6.79,23.78-1.2,4.33-14,19.67-3.18,16.09,3,1.92-4.68,8.69,4.61,7.62-.9,4.74-5.54,8.35,2,10.74,3.14,1,2.38,6.93-1.29,10.66-1.82-7.46-9.23-4.41-3.61,1.08,2.34,4.83-1.2,9.33,6.3,10.81,4.48.1,10.18,9,13.26,4.27,6.18-12.5,18.5-27.17,8.7-4.37,21.2-8-.15-23.1,19.63-29,11.37-.83-5.32-6.87,7.79-11,5.43,5.35,27.46,10.86,12.83.31,2.38-2.57,8.23-6.59.46-5.88-5.27-12.86,5-18.56,17.41-19-4.8,4.49-1.46,11.42,2.59,16.87,6.64,3.68,24.24-11.05,14.51-15.92,11.12-6.42,18.21-15.32,23.62-25.89,4.4-4.8,3.46-24.06-7.46-16.4-1.38-4.18,3.61-10.38-2.81-10.54,5.22-10.29-7.73-6.55-14.2-8.5,9-11.34-1.36-16.62,10.48-27.67,1.81-11-9.43,8.17-11.07,11.22-2.72-16.24-12.1,2.69-19.76,8.68,6-9.73-1.4-20.76,4.6-29.52,5.38,4.29,5.38,4.29,8.69.34,6.18,1.34,6.72.44,4.43-8.49-10.72,10.44-2.76-12.28,5.76,1.71,4.74,16.29,12.25,1.18,14.43-7.63.76,13.59,9.6-.36,10,21.72,9.94-2.72,11.62-18.22,22.82-6.9,2.89-2.81,2.52-4.17-1.05-6.26C495.26,39.28,521,40.51,508,30.6c-3.11,4.17-5.78,9.84-13.24,5.41,6.55-1.54,8-6,7-10.82-.3-1.42-4.25-2.19-6.77-2.89-1.43-1.6-.8-5.22-5.2-4.52a41.36,41.36,0,0,1-1.21-4C501.27,15,535.78,45.13,512.9,45.58c6.9,6.43-3.46,8.52-3.18,14.87,6.09-1.17,6.29-5.65,11.15-4.91-3.29-24.09,11.94,10.25,11.26,17.56-1,11.72-2.42,28.34-3.92,34.84,8.88,1,16.3-15.17,23.23-7.42,8.16,7.14-19,10.79-24.33,15.87-6.6,7.78,13.76,2.23,16.21,2.38-8.41,8.6,7.64,16.65-5.26,21.33-1.47,7.92,12.33,7.91-10.12,9.9-1.07-4.06,10.3-2,3.18-7-7.88-11.12-44.17,4.09-54.3,8.95-25.44,10.06-8.35,14.1-20.57,19.28-2.73,2.37-7.11,7.56-15.59,9.41,3.2,6.65.09,4.68-5.63,3.43-1.55,9.72,21.26,2.8,27.92,3.89,25.79.61,17.14,13.34-2.48,3.87-8.29-3-17.48,1.75-26.16,3.44,4.4-7.09-5-5.55-10.7-.77,12.29-2.09-2.29,8.36-8.2,8,.51-3.35,1.49-4.8,4.07-7.41-3.53.36-10.44-1.79-11.66,2.76,2.4,7.44-9.89,9.24-6.48,15.88,2.09,4.74-4,9.69,4.46,11.78-12,4.69-3.16,6.27,5,4.88-4,2.8-5.85,7.48-9.87,7.15-4.38-4.57-16.77,3.6-7.13,3.73,18.68-6.3,5.66,14,24.28,10.53,26.46-4.65,20.86,22.56,37.65,22.79-5.1,5.49-23.28-3.09-14.26,8.47,35.89-4.75,38.49,15,2.11,4.11-8.4.08-13.7-12-22.19-4.55-4.08,3.73-15-2.35-22.77-3.65-8,2.19-10.55-7.58-16.29-1.92-3.51-3.42,2.43-9.33-4.95-11.5-9.45,4.1-18.64,18.33-12.18,28.64.43,6.78-6.31,12.4-8.24,19,4.14-.79,10.15.38,3.74,2.57-6.28,4.66-.8,18.95,6.22,13.54,2.55-6.69,13.54.27,19.2-3.77-7.47-9.6-15.69-2.5-23.89-1.75,8.19.94,17-22.05,15.77-9.27.29,6.61,8.55-.71,18.15,11.5,25.35,0,57.48-8.55,66.75-10.56,9.76,5.26,21.57,5.12,31.06,9.13-31.17-5.48-35,5.84-3.37,14.55-21.45,14.31-1.88,3.77,6.53,2.44-9.44,8.7,12.46,8.71,16.47,14.62-9.24,4.9,8.19,6.63,2.34,13.65-.44.8.79,4.17,2.46,3.05,1.83-10.69,5.33-7.15,13.11-1.88-15.32-1.16-.61,14.24-8.25,28,5.46,40.08-33,48.44-10.43,19.06,10.27-11.44-12.5,3.66-9.58-21.87-9.15-19.74-14.78,8.68-25.26.08,5.27-4.42,5.17-17.59-.62-20.35.65-12.84-12.06-19.61-24.23-17-4.58-.41-1.19-2.46,1-4.44-5.1-4.22-16.06-2.58-16.71,5-6.05,13.28-15.1,31.26-29.14,36.26-13.8,9-63.42,5.38-48.08,22.91,4.37,13.38,6.25,29.21,25.12,32.45,7.39-.86-1.42-5.77-4.74-6.79,2.66-4.38,12.46-5,11.8,2.29,1,9.27,19.57-.1,13.35,6-18.72,6.86,4.82,1.25-4.64,10.73-4.17,2.94-6.92-2.92-12.87-.62-6.56-1.93-6.45-13.46-14.33-3-9.22,18.63,11.73,32.47,22.82,36.31-20.13.6,7,12.07,3.58,20.62,10.23,4.6,9.42,23.11,6.75,31.67,2.26,5.92,9.81,28.42-2.74,17-.25-12.32-12.27-15.56-14.94-26.55-1.94-8.28,1.34-17.49-7.4-23.14-18.43-4.72-2.2-3.65-9.05-8.57-6.1-1.18-8.25-6.07-11.63-9.85-10.44-7.24-35.75,10.54-19.41-16.49,2.8-5.41-6.14-1.67-5.64-6.29-2.46-5.15.67-15.1-8.15-13.43-5.46.13.18-7.92-1.28-11.09.2-3.79-10.38-9.86-3.41-11.34,19.95-8.82,2.49-14.26,8.15-26.48,1.66-5.46,3.25-10.88-3.17-16.27,3.7-.13,9.9,2,6.31-2.49-3.55-4.16-.14-11.05-2.92-16.11,7.09-7.79-5.08-6.38,7.59-13.38-1.81-7.25,11-20.53-3.58-12.91-5.31,3.44-4.75,11.52-11.65,12-2.66,4.38-3.58,9.84-5.68,14.56,5.19,0,4.91-.08,3.08,4.54-.64,1.61-.28,4.86.87,5.52,7.16,4.47-4.37,11.1,3.3,15.68,4.23,4.82.67,6.8-5.73,8.54.72-5.33,1.63-7.82-4.45-6.68-11.3.72-15.77-13.32-14.25-20.84-11.36-4.33-24.45-2.71-32.65-12.89-11.67,5.06,2.93,11,12.79,13.89-42.7,5.49-1.08-5-23.44,27.4,25.8-3.59-13.77,6.22,4.95,16.54-2.95.74-2.06,5.78-1.77,7.89,7.12,15.25,25.73,18,8.77,30.57-3.19.21-6.1-3.1-8.56.57-10.5,4.71,2.24-10.39-8.74-11.95,3.9,4.22-.95,10.46-5.1,6.93-2.22-9.5-12.23,1-6.82-9.7-3.71-5.55,5.59-8.62.64-12.57-14.31-1.59,6.66-4.13,5.51-9.76-10.59-8.16-4.16-10.83-16.92-10.24,9.46-8.39,2.11-14.49,11.28-28.57-7.14,2.35-4.36-2.34-5.41-7.12-3.3-2.65-1-4.44,1.18-5.77,15.52-15.13-5.94-5.42-11.5-11C242.91,366.62,248.42,353.64,228.33,355.6Zm6.48-73.88c7.79,7,9.89-9.25-.05.08,5.78-8.1,5-16.16-5.36-8.3-9.37,8.3-3.92,10.68,2.42,1.39C232.57,277.53,230,281.09,234.81,281.72ZM386.34,357.3c-13.82,1.54-14.57-19.12-25-5.91-6.66,10.74,28.07,32.8,27.76,16.19,5.39.37,11.31-.54,11.79-7.93,4.92-7.47,13.77-6.26,19.23-18C380.77,327.27,402.18,352.16,386.34,357.3Zm-262.1,1.35c3.85,17.79-20.43,16.55-23.48,2.72-7.62-9.77-26.26,5.88-12.07,9-16.67-2.28-2.88,11,2.49,16.05,9.39-.88,25.42,6.14,30.06-4.53.82-6.91,11.56-2.73,10.82-9.39C130.53,367.14,132.89,357.13,124.24,358.65Zm173.06-74.4c18.29-6.61-7.9-10.94,10.05-21,2.23-10.73-19.21-1.59-13.66,5.8.3,2.61-.23,5.29-.39,8C300.27,276,293.05,283.29,297.3,284.25Zm87.35-43.52c-9.93-12.6-53.63,28.5-34.41,20.59C362.15,253.24,370.67,242.7,384.65,240.73ZM202.2,347.59c5.27-15.74,32.92,12.05,28.24-7.22-4.86,8.72-10.05-4-15.39-3.68-3,3.69-4.15,3.6-7.08,0-10.06-5.71.28,3-5.93,5.2C199.92,343.38,199.59,345.7,202.2,347.59Zm-27.57-82c-1.6,7.63-9.93,19.85,2.64,19.9C184.23,281.75,178.32,270.56,174.63,265.57ZM320,331.14c20-15.26-3-13.14-5.82,3.37C313.18,340.84,324.24,335.18,320,331.14Zm-110-6.32c-3.65,2-6.59,7.77-1,7.63,6.17-1.86,3.24-9.26,10.39-10.9,3.41-9.66-7.65,3.55-11.71.24C204.58,322.46,208.45,323.63,210,324.82ZM325.19,252c-23.36.9-.78,24.78-3.34,11.22C315.44,260.32,323.89,255.63,325.19,252Zm35,191.49c-2.21,7.87,8.12,17.2,11,14.15C368.93,450.93,369.51,447.52,360.18,443.45ZM237.31,263.9c-3.22-5.35-4.85-12.55-10.91-6.87C224.14,262,233.11,268,237.31,263.9Zm71.8,43.71c-6.29,3.06.55,17.43,5.52,11.79C315.74,316.37,313.36,307.81,309.11,307.61ZM183.23,338.25c3.18-8.23-2.51-11.45-6.38-4.38C180.5,348.45,195.37,334.84,183.23,338.25Zm37.33-97.92c3.49,4.75,9.88,4.61,8.9-1.43C226.62,230.81,224.49,233.84,220.56,240.33Zm4.61,48.12c-4.67-3.81-7.11-11.34-12.2-4.63C208.76,290.66,221.14,288.13,225.17,288.45Zm37.26-4.56c6.47,2.1,14.81,7.8,16.09-2.18A27.49,27.49,0,0,0,262.43,283.89Zm179.08,63.59c2.08,2.92,8.22-2.68,10.33-4.26C450.3,332.87,443.39,341.43,441.51,347.48ZM309.19,292.39c.47-4-8.88-7.24-10.35-2.45C301.47,294.65,304.52,295.94,309.19,292.39ZM150.56,346.32c.07,5.93,9.58,9.56,11.24,2.38C158.06,346.84,155,345.26,150.56,346.32Zm216.81-85.81c-4,.18-8.93-2.24-11.23,1.08C355.81,274.66,361.48,265.93,367.37,260.51ZM198.45,334c3.41-4.26,7.16-7.23,1.24-9.84C192.83,323.78,194.87,329.71,198.45,334ZM276,260.61c-1-9.2-13.35,1.7-6.4,7.39C274.31,265.56,269.94,260.43,276,260.61Zm-108.15,248c6.85,6.08,15.38-3.95,5.87-8.69C174.36,506.68,174.36,506.68,167.89,508.59Zm-1.73-243c6.16-1.34,1-11.77-4.19-8.07A12.77,12.77,0,0,0,166.16,265.55ZM333,336.74c3.33,4.07,6.58,4.17,8.23.49C338.89,332.48,337,332.21,333,336.74Zm-162.62,5.69c4.1,3,7.66,9.51,11.3,9.86C178.38,346.6,179.49,338.54,170.42,342.43Zm102.27,23.32c4.16,3.89,4.85,9.39,11.14,9.44C284.39,369.87,283.4,369,272.69,365.75Zm22.06-62.59c2.07-.25,5.64.6,4.6-3.07C294.6,288.26,291.88,292,294.75,303.16ZM235.61,160.7c-5.58.16-8.16,4.05-6.68,10.24C232,167.85,236.74,166.23,235.61,160.7ZM178,320.47c5,.63,1.9-13.66,1.24-16.15C173.85,308,178.27,315.09,178,320.47ZM296.73,573.42c5,4.88,9.79,2.08,12.77-.94C305.81,569.22,301.72,572.9,296.73,573.42Zm-58.68-240.7c-3.86,1.31-10.78,6-4.14,7.56C236.87,338.53,240.75,336.62,238.05,332.72Zm35.19,29c1.27,2.66,8.5,2.45,12.16,4.16C285.75,356.45,279.51,361,273.24,361.77Zm-82.11,61.15c2.94-2.24,8.23-4.31,3.05-6.26C190.19,418.62,184.78,419.48,191.13,422.92ZM414.34,260.44l15.57,4.21C424.78,258.68,420.59,257.35,414.34,260.44Zm-99.88,40.82c4,1.54,2.58-10.59.11-10.06C311.71,294.61,312.34,298,314.46,301.26Zm9.05,282.15c3.93-2,14.2-4.85,6.88-9C326.56,575.12,326.21,579.83,323.51,583.41Zm1.83-242.89c2.91-3.93,8-5.15,2.43-8.34C325.35,335.28,322.15,336,325.34,340.52ZM166.81,324.33c-.39,3.51,9.29,3.74,10-1.27C173.84,321.66,170,324.13,166.81,324.33ZM510.53,81.85c2.31,2.25,4.75,6.38,5.94,1.9C514.68,80.28,513.74,77.28,510.53,81.85ZM356.88,238.93,349.83,242C351.58,246.84,356.86,244.86,356.88,238.93ZM285.18,354.7c4-1.73,9.61-.52,11-4.58C293.3,349,285.67,350.85,285.18,354.7ZM156,339.67c3.86,4.24,7.93.94,10.59-2C163.66,336.11,159.76,339.21,156,339.67Zm145-27.92c-3.83-1.5-5.48-4.43-8.11-.75C296.26,313.21,297,315.74,301,311.75ZM189.56,415c4.44,2.34,4.93-5.22,2.42-8.3C189.61,408.16,190.53,412.48,189.56,415ZM74.9,436.44H87.75C84.27,433.17,80.87,433.27,74.9,436.44ZM296.11,599c-1.65,3.14,5.83,5.71,8.78,2.38C303.14,599.17,298.82,600,296.11,599ZM406.64,262.92c-.59-4.26-6.36-4.45-7.18,1.64ZM219,151.84c.26,3.69,4.76.22,7.15,0C225.89,148.26,220.27,149.33,219,151.84ZM383.84,255.48c-5.64-1.11-6.31-1-8.44,1.85C382.85,258.49,382.85,258.49,383.84,255.48ZM502.58,99.38c-5.09,1.59-5.83,3.85-2.5,8.56ZM401.28,205.62c-3.29-3.33-3.76-.29-5.94,1.76C397.08,210.43,399,207,401.28,205.62Zm-87.94,367c3.91-.8.7-3.43-.58-5.61C308.6,566.63,312.51,570.47,313.34,572.61Zm-69.25,8.31c2.3-3.5,2.48-4.31-.38-6.68C240.83,577,240.65,577.64,244.09,580.92Zm-15.8-335.15c-2.76,2.34.87,3.25,2.6,4.9C233.59,247.36,230.84,247.1,228.29,245.77ZM320,577.9l-8.3,3.81C317.23,582.75,318.73,582,320,577.9ZM285.7,328.31c2.46-3.24-2.29-2.89-4.58-3.85C278.86,327.32,283.63,327.28,285.7,328.31Zm26.57-58c-2-3-3.51.48-5.45,1.94C309,274.68,310.39,271.38,312.27,270.33ZM292.48,376.92c3.74,2.95,4.61,2.8,6.72-.95Zm-124-79.45c-3.12-2.34-2.89,2-4,4.15C167.19,303.39,167.28,299.22,168.52,297.47ZM353.77,145.75c-2.56-.37-.71,4.53-1.24,6.38C355.08,152.49,353.24,147.6,353.77,145.75ZM204.71,355.26c1.7,4.76,2.39,5,6.21,2.49ZM522,98.27c-2.56-1.78-3.32-2.11-5.21,0C518.79,100.4,519.41,100.85,522,98.27ZM273.16,634.39c.93,6.25,1.41,6.61,5.84,1.73ZM226.53,155.2c-3.59.93.25,3.53,1.13,5.62C231,160,227.22,157.2,226.53,155.2Zm105.65.39c-1.05-3-3.33.11-5.27.84C327.91,159.25,330.29,156.2,332.18,155.59ZM148.94,468.52c-.29,1.77,2.54,1.15,3,.74C154.33,464,151.43,464.62,148.94,468.52ZM269.82,310.85c-3-2.49-3.4-2.06-5.75-.14C266.05,313.26,266.73,312.52,269.82,310.85ZM305.94,233c2.37,2,3.53-2.84,5.23-4.24C308.88,226.5,307.63,231.58,305.94,233ZM175.38,388.08c-.37,3.51,3.37,1.12,5.58,1.14C181.2,386.3,177.3,388.36,175.38,388.08ZM431.47,270.75c1.57-3.37-3-2-5.14-2.65C425.15,270.91,429.66,269.94,431.47,270.75Zm-104.16-1.27c2.84,2.27,3.39-3.15,5-4.94C329.72,262.61,328.93,267.89,327.31,269.48ZM72.94,363.7c-3.41.1,0,4.62,0,6.86C76.47,370.55,73,366,72.94,363.7Zm244.88-54.26c3.06.54,1.76-2.14,1.82-4.22C316.27,304.75,317.54,307.08,317.82,309.44ZM190.43,441.24c-1.3-2.94-3.21.35-5.05,1.31C186.69,445.2,188.64,442.06,190.43,441.24Zm213.44-166c-1.44,2.8,3,2,4.76,2.78C410.1,275.14,405.7,276,403.87,275.21ZM533.66,126.42c-3.64.78.93,6.12,2.22,3.23A27.65,27.65,0,0,0,533.66,126.42ZM312.42,274.7c.27,1.59,4.89,2.06,5.44.47C316.08,272.62,314.64,272.76,312.42,274.7Z"/></svg>
        </div>
        ), { ...size }
    )
}