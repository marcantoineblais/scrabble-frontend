
import { ImageResponse } from "next/server"
import CheetahLogo from "./components/CheetahLogo"

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
    width: 1024,
    height: 1024,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse((
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgb(255 237 213)", color: "rgb(6 78 59)", borderRadius: "50%" }} >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M437.06,515.51c-15.54-23.84-12.85,8.13-20.59,11.65-9.72,7.61,5,17.22,7.83,23.8-18.47,7.14.89,4.49-12.87,13.81,19.31-4.68,20.05,10.88,2,14.47-7,8.43-8.72,25.43-15.39,37.68,4.36,8,1.25,15.49,5.72,24.16,8.29,10.63-22.91,12.64-8.5,18.78,6.93,3.21-.7,19.72-5.3,17.09-.58,11.07,4.49,22.55-1.54,32.33,12.11,2.06,52.39-19.88,43.85-26.29,22.33.43-.77,14.91,24.57,17-4.91,9.47-3.71,10.31,5,16.72-1.58,7-8.8,5.54-12.36.43-13.65-4.61-4.22,6.05,1.47,10.41-16.45.2-30.34,31.15-2.67,7.06,3,3.77-5.92,5.57-6.12,9.8,1.94,2.75,17.31,8.3,6.27,11-2.56-3.82-5.57-7.81-10.76-4.11-6.61,14.11,2.05,13,13.06,15.2-32.63,60.64-42.82-27.18-53.65,45.82-10,11.5-5.43,30.72,11.38,28.24-6.71-5.72-9.18-13.4,3.83-12.47,9.9.35,16.92-10,23.22-16.34,2.73-7.94-9.85-5.67,1.65-19.35,11.88,18.39,22.82,24,34.66,8.61-5.81,20.53,24.07,6.85,29.1,14.18,6.05,8.4,11.74-7.69,17.75-9.8,4.4-3.27,9-4.13,13,1.25,11,2.94,22,3.81,34.11.59-6.46,12.81,19.48,15.1,13.78,9.3-17.95-38.82,41.25-48.55,13.66,27.72-18.7,18.15-49.28,42-53,53.26-13.68,8.73-37.11,21-40,37.59.43,2.1-1.09,4.53-2,7.79,15.45-5.13,17.22,9.94,26.52,13.85,10.76-13,15.89,1.86,27.83.24,6.57,2.93,40.72,3.69,26.75,13.65-14.83,7.86-92.51-5-57.49,18.75-7.71-1.56-17.06,4.61-16.34-6.7-1.34-6.24-7.71-3.09-12-2.73.52,3.9,7.82,4.39,7.43,9.66-5.87,7.1-31.34-5.19-14.21-10-14.85-7.18-32.88-1.42-49.18-2.58-9.46-1.79-14,2.77-21.28,7.85,3.92-24.9,39.55-24.64,65.8-37.78,10.66-4,12-13.74,2.4-23.6-3.38,10.57-9,12-5.16-4.36-22.42-13.17-39.64-29.43-59.65-43.06-9.31-11.46-26.47-11-30.66-23.09-6.8-27.46-26.09-50.27.41-66.44-6.14-7.41-1.48-12.79-5.55-19.4-13.87-6.44-14.39-22-28.73-27.27-17.51-8.28,3.63-30.8-22.82,3-11.68,8.3-25.92,16.62-37.64,21.53-7.56-7.85-37.34-8.59-12.09-15.77-12.32-5.07-8.83-4.66,1.86-6.41-1.67-8.09-18.95-3.77-3.53-13.38-24.87-7.91-13-6.58,6.16-15.25-15.64-28.69,65.48-54.22,26.67-108.06-3.23-5-9.93-1.8-13.67.91-9.31,2-15.92.16-26.31,3.36-5.95-5.57-13.9-3.89-22.44-4.5,15.06-9-9.16-8.53-14.56-15.07-8.17-12.51-17.66-2.51-8.52,6.25-24,11-.83,18,17.55,23,5.15,18.33,37-3.92,3.15,24.45-2.43,1.83-5.58,2.73-7.66-2.52-7.54-10.92-27-7-39-11.26,11.77-6.13,6.7-4.34-3.54-13.1,9.52-6.88,16.06-11.86.35-13.56,3.09-7.56-7.76-11.39,8.32-19,6.55.28,12.55,5,16.9-2.09,1.66-11.69-18.79-23.19-19.2-37.7-1.3-4.18-7-19.88-11.37-10.05-.58,7.85-15.86,3.62-2.18,14.25-11.68,4.16-38.85.59-39.29,15.5,2.51,6.85-4.7,5.49-8.74,3.07,5,19.48-17,14.86-5.16-.74C167,535.3,167.73,567.05,173,524c45-42.19,150.55-15.47,98.38-41.11a62.7,62.7,0,0,1,34,.6c1.45,7.63-15.05,7.4-10.06,18.19,10.53-5.75,19.47-12.63,15.31-25.42-3.69-5.6,2.12-11.43-5.28-15.35-.87-.54-.84-4.21.17-5.08,8.22-9.14-12.33-25.28,12.77-16.25C315,425.5,298.08,430.79,300.45,410c38-5-7.12-13.66,9.8-25.75,28,47.8,34.6,4.21-8.15-12.76,13.34,0,17.94-5.26,17-18.3,17.5,2.64-1.67-25.66,18.87-18.48,6.79-3.29,15.5,34.66,21.18,5.51-1.72-12.1,14.31.48,17.45-8.93,8.6-11.18,15.48,11.07,12.68,17.74-5.91,34.58-.4,12.23-14.58,12.66-4.9,4.89-7.46.93-12.37-1.88,27.39-2.56-37.53-17.8,17.09,19.7,25.32,14.52-19.82,20.89-4.57,36.49,3.78,4.81-1.44,7.17-5.31,6.74-14.37-3.87-16.39,24.64,5.07,4.61-2.66,8.41-1.2,14.41,5.7,20.22,3.88-8.3,3.35-18,13.2-11.65-15.2,7.54,14.93,13.13-1.06,19-24.43,1.64-8.65,16.84,6.7,6.34,6.24-3.12,19.43,6.2,18.93-6.82,10.58,17.43,45.23-22.05,24.28,10.15,11.07,4.06,11.28-10,17.67-15.5-11.84-16.31-38.95,7.83-37.56-6.49,4.05-6.93,8.83-9.12,17.82-5.2-1.95-4.84-4.42-8.6-8.94-8.85-11.07-3-10,11.91-18.21,17.49-14-4-14-4.05-14.68-11.5,15.28-1.76.17-6.71-.46-13.62,5.17-3.55,24.22-12.79,7.12-12.94-1.63-14.86,25.84-25.81,16.82-42.75-5.64,2.53-16.56,4-15.73,11.16-6.16,21.22-5.39-5.29-5.11-15.41,13.37,10.49-3-9.93,16.26-9.95-6.38-17,4.59-31.62,14.27-44.89,8.77-15.63-24.06-6.85-7.27-30.4,2.22-13.68,9.14-42-10.38-48.74-32.59,27.57,24.21-7.1-8.09,32.79,4-14.72-7.86-11.19-11.94-25.09,2.67-28.16,48.51-15.06,39.74-29.41,14-16.05,43.38,33.22,14.39,17.53-5.13,19.09,24.45,24.06,11.84,41.77,7.88,11.25,23.15-46.71,8.19-24.28-9-8.78,9.28-34.35,16-16.73,14.4-9.57.94,13.47.05,20.36-1.75,7.12,3.54,14.81-3.43,20.63-6.84,7.59,10.06,14.2,2.45,23.59.15,26.71-25.69-3.17-7.64,28.28,5.39,10.7-7.92,15.38,11.41,7.65,17.4,5.95,2.57,32.3,24.85,34.55-7,13.17,2.06,25.92,16.51,19.41-2.11-9.64-16.89-5.36-15.81-18.42,3.77-7.69,5.66-13.61,20.61-12.94,14.89-.31,7-22.44,23.07-17.56,3.78-8.75,4.52-8.89,7.18.54,9.56,14.55,9.33-13.79,16.74-10.67-9.76,42.29,41,2.23,27-16.79,1,17.79-18.13-2.83-10.08-8.28,3.27-2.3,1.76-4.91-1.86-5.63-13.33-5.86-12.92,17.23-23.51,7.76-5.54,11.4-11.6,24.77-26,27.59,19.57-21.75-.17-39.35-9.25-66,8-1.49,8.29,15.79,20.55,10.21,17.84,10.82,18.77-2.67,24.26-14.17-2.28-11-20.38-20.53-4.93-29.44,17.15-13,37.53,5,31.84-19.48,27.95,9.8,20.67,13.47,9.68,33.62-1.71,6.11-19.92,27.8-4.53,22.74,4.27,2.71-6.68,12.28,6.57,10.77-1.28,6.71-7.89,11.81,2.85,15.19,4.48,1.49,3.39,9.78-1.84,15.06-2.58-10.55-13.15-6.23-5.15,1.54,3.35,6.82-1.71,13.18,9,15.28,6.39.13,14.53,12.74,18.91,6,8.82-17.66,26.39-38.4,12.42-6.16,30.23-11.26-.21-32.67,28-41,16.21-1.18-7.6-9.71,11.1-15.53,7.74,7.56,39.17,15.34,18.31.44,3.38-3.65,11.74-9.32.64-8.32-7.5-18.18,7.13-26.24,24.84-26.81-6.84,6.35-2.08,16.14,3.69,23.86,9.48,5.2,34.58-15.63,20.7-22.51,15.85-9.07,26-21.66,33.7-36.6,6.27-6.78,4.93-34-10.65-23.19-2-5.91,5.15-14.67-4-14.9,7.45-14.54-11-9.25-20.26-12,12.89-16-1.94-23.49,15-39.12,2.58-15.57-13.46,11.55-15.8,15.86-3.87-23-17.25,3.8-28.18,12.28,8.61-13.76-2-29.36,6.57-41.74,7.67,6.07,7.67,6.07,12.38.47,8.82,1.9,9.59.64,6.32-12-15.28,14.76-3.93-17.37,8.23,2.42,6.75,23,17.46,1.67,20.58-10.79,1.07,19.21,13.69-.51,14.23,30.7,14.18-3.85,16.57-25.76,32.55-9.75,4.11-4,3.6-5.9-1.5-8.85-14.59-13.44,22.08-11.7,3.55-25.71C831.48,62,827.67,70,817,63.7c9.34-2.17,11.43-8.43,10-15.29-.42-2-6.06-3.11-9.66-4.08-2-2.27-1.14-7.39-7.41-6.4a56.17,56.17,0,0,1-1.73-5.71c18.13,1.76,67.35,44.37,34.72,45,9.83,9.1-4.94,12-4.54,21,8.69-1.65,9-8,15.9-6.93-4.69-34.07,17,14.48,16.07,24.82-1.47,16.57-3.45,40.06-5.59,49.25,12.66,1.43,23.24-21.45,33.12-10.48,11.65,10.08-27.15,15.25-34.7,22.43-9.4,11,19.63,3.16,23.13,3.36-12,12.16,10.89,23.54-7.51,30.15-2.09,11.2,17.59,11.18-14.43,14-1.53-5.74,14.7-2.83,4.54-9.87-11.24-15.72-63,5.79-77.45,12.65-36.28,14.22-11.91,19.94-29.34,27.26-3.89,3.35-10.14,10.69-22.23,13.3,4.56,9.41.12,6.62-8,4.86-2.21,13.73,30.32,3.95,39.82,5.5,36.79.85,24.45,18.85-3.53,5.46-11.82-4.21-24.93,2.48-37.32,4.86,6.28-10-7.16-7.84-15.25-1.08,17.52-3-3.28,11.81-11.71,11.26.73-4.73,2.13-6.78,5.82-10.48-5,.51-14.89-2.52-16.63,3.91,3.42,10.52-14.11,13.06-9.25,22.45,3,6.7-5.77,13.7,6.36,16.66-17.12,6.62-4.51,8.85,7.12,6.9-5.73,3.95-8.34,10.56-14.08,10.1-6.24-6.45-23.91,5.09-10.17,5.28,26.65-8.91,8.07,19.8,34.63,14.88,37.74-6.57,29.76,31.89,53.7,32.22-7.27,7.76-33.2-4.37-20.34,12,51.19-6.72,54.91,21.23,3,5.82-12,.11-19.53-17-31.65-6.44-5.82,5.27-21.36-3.31-32.47-5.16-11.47,3.1-15-10.71-23.23-2.72-5-4.83,3.46-13.18-7.07-16.25-13.47,5.79-26.58,25.92-17.37,40.49.61,9.59-9,17.53-11.75,26.84,5.91-1.12,14.47.54,5.33,3.63-9,6.59-1.14,26.8,8.87,19.14,3.64-9.45,19.31.39,27.39-5.32-10.65-13.58-22.38-3.53-34.07-2.48,11.68,1.34,24.21-31.17,22.48-13.1.43,9.34,12.2-1,25.89,16.26,36.16.05,82-12.09,95.21-14.93,13.93,7.44,30.76,7.23,44.3,12.91-44.45-7.76-49.89,8.25-4.8,20.56-30.6,20.24-2.69,5.33,9.31,3.46C807,507.94,838.18,508,843.9,516.31c-13.17,6.94,11.69,9.38,3.35,19.31-.64,1.12,1.12,5.89,3.5,4.3,2.61-15.11,7.6-10.11,18.7-2.66-21.84-1.63-.87,20.13-11.76,39.59,7.78,56.66-47.1,68.48-14.88,26.95,14.64-16.17-17.83,5.17-13.67-30.93-13-27.91-21.08,12.27-36,.12,7.51-6.25,7.36-24.86-.88-28.77.92-18.15-17.21-27.72-34.56-24-6.55-.57-1.71-3.48,1.48-6.27-7.28-6-22.91-3.65-23.84,7.09-8.62,18.77-21.53,44.19-41.56,51.26-19.68,12.72-90.45,7.59-68.57,32.38,6.23,18.92,8.92,41.3,35.82,45.88,10.54-1.22-2-8.15-6.76-9.6,3.79-6.19,17.77-7.1,16.83,3.23,1.45,13.11,27.91-.13,19,8.44-26.7,9.71,6.86,1.77-6.63,15.17-6,4.17-9.87-4.12-18.35-.88-9.36-2.72-9.2-19-20.44-4.27-13.15,26.33,16.73,45.9,32.56,51.32-28.73.86,9.91,17.07,5.09,29.16,14.6,6.5,13.44,32.67,9.64,44.76,3.22,8.38,14,40.18-3.92,24.1-.35-17.42-17.49-22-21.31-37.53-2.76-11.72,1.92-24.73-10.55-32.73-26.29-6.66-3.14-5.15-12.91-12.1-8.7-1.68-11.76-8.59-16.59-13.93-14.89-10.23-51,14.91-27.68-23.32,4-7.64-8.76-2.36-8-8.88-3.5-7.28,1-21.36-11.61-19-7.79.2.25-11.19-1.83-15.66.29-5.36-14.81-13.94-4.86-16,28.45-12.46,3.54-20.15,11.62-37.43,2.37-7.71,4.64-15.38-4.53-23,5.29-.19,14.13,2.85,9-3.53-5.06-5.88-.21-15.62-4.17-22.77,10.11-11-7.25-9,10.82-18.92-2.58-10.24,15.7-29-5.1-18.24-7.57,4.86-6.78,16.28-16.61,16.92-3.8,6.2-5.12,13.92-8.1,20.59,7.39,0,7-.11,4.38,6.42-.91,2.28-.4,6.87,1.24,7.8,10.22,6.32-6.22,15.7,4.71,22.17,6,6.82,1,9.62-8.18,12.07,1-7.53,2.34-11-6.34-9.44-16.12,1-22.49-18.83-20.32-29.46-16.2-6.12-34.88-3.83-46.57-18.23-16.64,7.16,4.18,15.5,18.24,19.65-60.9,7.76-1.54-7.07-33.43,38.73,36.8-5.08-19.65,8.79,7.06,23.38-4.21,1-2.94,8.17-2.53,11.15,10.16,21.57,36.7,25.46,12.51,43.23-4.55.29-8.69-4.39-12.21.79-15,6.67,3.2-14.68-12.46-16.88,5.56,6-1.35,14.79-7.28,9.79-3.17-13.43-17.44,1.39-9.72-13.72-5.29-7.84,8-12.18.9-17.76-20.4-2.25,9.51-5.84,7.87-13.8-15.11-11.53-5.93-15.31-24.14-14.47,13.5-11.87,3-20.49,16.09-40.39-10.18,3.32-6.21-3.31-7.71-10.07-4.71-3.75-1.45-6.28,1.68-8.15,22.14-21.4-8.48-7.66-16.4-15.57C457.84,531.09,465.71,512.74,437.06,515.51Zm9.24-104.45c11.11,10,14.1-13.07-.07.11,8.25-11.45,7.14-22.83-7.65-11.73-13.36,11.73-5.59,15.1,3.45,2C443.1,405.14,439.41,410.17,446.3,411.06ZM662.43,517.9c-19.72,2.18-20.79-27-35.69-8.35-9.5,15.19,40,46.38,39.59,22.89,7.69.52,16.14-.75,16.82-11.21,7-10.56,19.64-8.85,27.42-25.38C654.47,475.45,685,510.64,662.43,517.9Zm-373.84,1.92c5.49,25.15-29.13,23.39-33.49,3.84-10.87-13.8-37.46,8.32-17.22,12.71-23.77-3.22-4.1,15.59,3.56,22.69,13.39-1.24,36.25,8.69,42.88-6.4,1.17-9.77,16.47-3.86,15.42-13.28C297.56,531.82,300.93,517.67,288.59,519.82ZM535.43,414.64c26.09-9.34-11.28-15.46,14.33-29.74,3.19-15.17-27.4-2.25-19.48,8.2.42,3.68-.33,7.47-.56,11.27C539.67,403,529.37,413.28,535.43,414.64ZM660,353.11c-14.17-17.81-76.5,40.3-49.08,29.11C627.92,370.81,640.08,355.9,660,353.11ZM399.79,504.19c7.52-22.26,46.94,17,40.27-10.22-6.92,12.34-14.32-5.68-21.94-5.19-4.27,5.21-5.92,5.08-10.1,0-14.36-8.08.39,4.25-8.47,7.34C396.53,498.23,396.07,501.51,399.79,504.19ZM360.47,388.24c-2.29,10.78-14.17,28.05,3.76,28.12C374.16,411.1,365.73,395.28,360.47,388.24Zm207.31,92.68c28.52-21.56-4.21-18.56-8.3,4.77C558.07,494.63,573.86,486.64,567.78,480.92ZM410.94,472c-5.2,2.78-9.4,11-1.46,10.79,8.79-2.62,4.62-13.08,14.81-15.4,4.86-13.67-10.92,5-16.7.33C403.18,468.66,408.7,470.31,410.94,472ZM575.21,369c-33.32,1.28-1.11,35-4.77,15.86C561.3,380.8,573.35,374.19,575.21,369Zm49.9,270.71c-3.15,11.13,11.58,24.31,15.66,20C637.59,650.28,638.43,645.45,625.11,639.7ZM449.86,385.87c-4.6-7.56-6.92-17.74-15.55-9.71C431.08,383.23,443.88,391.67,449.86,385.87Zm102.42,61.8c-9,4.32.77,24.63,7.87,16.67C561.73,460.05,558.34,447.94,552.28,447.67ZM372.72,491c4.54-11.63-3.57-16.18-9.1-6.2C368.84,505.4,390,486.16,372.72,491ZM426,352.56c5,6.7,14.08,6.51,12.68-2C434.61,339.09,431.58,343.38,426,352.56Zm6.57,68c-6.66-5.39-10.14-16-17.4-6.55C409.14,423.7,426.8,420.12,432.55,420.58Zm53.14-6.45c9.23,3,21.13,11,22.95-3.08A39.57,39.57,0,0,0,485.69,414.13ZM741.11,504c3,4.13,11.73-3.8,14.73-6C753.65,483.38,743.79,495.48,741.11,504ZM552.38,426.15c.67-5.62-12.66-10.23-14.76-3.47C541.38,429.34,545.73,431.17,552.38,426.15ZM326.13,502.38c.1,8.39,13.67,13.52,16,3.38C336.83,503.13,332.43,500.89,326.13,502.38ZM635.37,381.07c-5.66.26-12.74-3.16-16,1.53C618.88,401.08,627,388.74,635.37,381.07ZM394.43,485c4.87-6,10.22-10.23,1.77-13.92C386.42,470.53,389.33,478.9,394.43,485ZM505.1,381.22c-1.47-13-19,2.41-9.13,10.45C502.63,388.22,496.4,381,505.1,381.22ZM350.85,731.79c9.76,8.59,21.93-5.59,8.38-12.29C360.08,729.09,360.08,729.09,350.85,731.79ZM348.39,388.2c8.78-1.89,1.34-16.63-6-11.4C342.79,381.34,345.15,385,348.39,388.2Zm238,100.65c4.76,5.75,9.39,5.89,11.75.68C594.75,482.82,592.05,482.45,586.4,488.85Zm-231.95,8c5.85,4.25,10.94,13.45,16.12,13.94C365.81,502.78,367.4,491.38,354.45,496.89Zm145.87,33c5.94,5.5,6.93,13.29,15.9,13.36C517,535.67,515.6,534.39,500.32,529.85Zm31.47-88.48c3-.35,8.05.85,6.56-4.34C531.57,420.31,527.7,425.53,531.79,441.37ZM447.44,240c-8,.22-11.64,5.72-9.53,14.47C442.23,250.09,449.05,247.8,447.44,240ZM365.29,465.85c7.14.89,2.72-19.31,1.78-22.83C359.35,448.19,365.65,458.23,365.29,465.85ZM534.61,823.44c7.13,6.89,14,2.94,18.21-1.33C547.57,817.51,541.73,822.71,534.61,823.44Zm-83.7-340.27c-5.5,1.84-15.37,8.51-5.9,10.69C449.23,491.38,454.77,488.68,450.91,483.17Zm50.2,41.06c1.81,3.76,12.12,3.46,17.35,5.89C519,516.7,510.06,523.14,501.11,524.23ZM384,610.68c4.19-3.16,11.74-6.1,4.35-8.86C382.65,604.59,374.93,605.82,384,610.68ZM702.36,381l22.22,5.95C717.25,378.49,711.28,376.61,702.36,381ZM559.91,438.69c5.64,2.18,3.67-15,.15-14.22C556,429.28,556.88,434,559.91,438.69Zm12.9,398.87c5.6-2.82,20.25-6.85,9.81-12.76C577.16,825.84,576.67,832.5,572.81,837.56Zm2.6-343.38c4.15-5.55,11.39-7.28,3.47-11.78C575.44,486.78,570.88,487.79,575.41,494.18ZM349.31,471.3c-.56,5,13.25,5.29,14.2-1.79C359.34,467.53,353.91,471,349.31,471.3ZM839.55,128.51c3.3,3.18,6.78,9,8.47,2.68C845.47,126.29,844.13,122,839.55,128.51ZM620.4,350.57l-10,4.4C612.85,361.75,620.38,359,620.4,350.57ZM518.14,514.23c5.7-2.45,13.71-.72,15.71-6.47C529.72,506.19,518.83,508.79,518.14,514.23ZM333.93,493c5.51,6,11.32,1.33,15.1-2.85C344.81,488,339.25,492.33,333.93,493Zm206.83-39.47c-5.46-2.12-7.82-6.25-11.56-1.05C533.94,455.58,534.93,459.16,540.76,453.51Zm-159,146c6.34,3.3,7-7.39,3.44-11.74C381.83,589.81,383.15,595.92,381.76,599.53ZM218.22,629.79h18.33C231.58,625.16,226.73,625.31,218.22,629.79ZM533.73,859.58c-2.35,4.44,8.31,8.08,12.52,3.37C543.75,859.84,537.59,861,533.73,859.58ZM691.39,384.49c-.86-6-9.08-6.29-10.25,2.31Zm-267.63-157c.37,5.21,6.8.3,10.2,0C433.58,222.4,425.56,223.91,423.76,227.46ZM658.87,374c-8-1.57-9-1.36-12,2.62C657.45,378.22,657.45,378.22,658.87,374ZM828.22,153.29c-7.27,2.24-8.32,5.44-3.57,12.09C826,161,827,157.31,828.22,153.29ZM683.73,303.48c-4.69-4.71-5.36-.41-8.47,2.48C677.74,310.28,680.44,305.47,683.73,303.48ZM558.31,822.29c5.57-1.13,1-4.84-.83-7.93C551.54,813.84,557.12,819.27,558.31,822.29ZM459.54,834c3.27-4.95,3.54-6.09-.54-9.44C454.88,828.46,454.63,829.41,459.54,834ZM437,360.24c-3.95,3.3,1.25,4.6,3.71,6.93C444.56,362.48,440.63,362.13,437,360.24ZM567.83,829.77,556,835.16C563.85,836.63,566,835.62,567.83,829.77Zm-49-352.84c3.52-4.58-3.27-4.08-6.53-5.44C509.12,475.53,515.93,475.47,518.88,476.93Zm37.9-82c-2.86-4.26-5,.68-7.77,2.74C552,401.11,554.1,396.44,556.78,395ZM528.55,545.65c5.33,4.16,6.58,4,9.59-1.35ZM351.75,433.32c-4.46-3.3-4.12,2.79-5.77,5.88C349.85,441.7,350,435.8,351.75,433.32ZM616,218.84c-3.64-.52-1,6.4-1.76,9C617.84,228.38,615.21,221.46,616,218.84ZM403.36,515c2.43,6.74,3.41,7.09,8.87,3.53Zm452.5-363.3c-3.65-2.52-4.73-3-7.44.05C851.34,154.74,852.22,155.37,855.86,151.72ZM501,909.63c1.33,8.84,2,9.34,8.33,2.45ZM434.49,232.2c-5.12,1.31.35,5,1.61,8C440.82,239,435.47,235,434.49,232.2Zm150.68.56c-1.5-4.22-4.75.14-7.51,1.18C579.09,237.92,582.49,233.61,585.17,232.76ZM323.83,675.15c-.43,2.49,3.62,1.62,4.31,1C331.51,668.7,327.38,669.63,323.83,675.15Zm172.4-222.91c-4.24-3.51-4.84-2.91-8.2-.2C490.85,455.66,491.82,454.61,496.23,452.24Zm51.51-110.09c3.4,2.81,5-4,7.47-6C552,333,550.17,340.18,547.74,342.15ZM361.53,561.43c-.52,5,4.81,1.57,8,1.61C369.83,558.91,364.28,561.83,361.53,561.43ZM726.8,395.55c2.23-4.76-4.24-2.83-7.34-3.74C717.79,395.78,724.22,394.42,726.8,395.55Zm-148.57-1.79c4,3.21,4.83-4.46,7.13-7C581.67,384.05,580.54,391.51,578.23,393.76ZM215.43,527c-4.87.14-.08,6.53-.07,9.7C220.45,536.64,215.5,530.18,215.43,527Zm349.27-76.7c4.36.76,2.51-3,2.6-6C562.49,443.62,564.3,446.91,564.7,450.26ZM383,636.57c-1.86-4.15-4.58.5-7.21,1.86C377.67,642.18,380.45,637.73,383,636.57ZM687.43,401.86c-2,4,4.22,2.78,6.79,3.93C696.31,401.77,690,403,687.43,401.86ZM872.55,191.51c-5.19,1.11,1.33,8.66,3.16,4.57A40.51,40.51,0,0,0,872.55,191.51ZM557,401.14c.39,2.25,7,2.91,7.76.66C562.22,398.19,560.16,398.4,557,401.14Z"/>
            </svg>
        </div>
        ), { ...size }
    )
}