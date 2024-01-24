import Image from 'next/image';
import Card from '../ui/Card';

import styles from './radar.module.css';

import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonMenuButton,
    IonImg,
} from '@ionic/react';
import { useEffect, useRef } from 'react';
// import Notifications from './Notifications';
// import { useState } from 'react';
// import { notificationsOutline } from 'ionicons/icons';
// import { getHomeItems } from '../../store/selectors';
// import Store from '../../store';

// const RadarCard = ({ title, type, text, author, authorAvatar, image }) => (
//   <Card className="my-4 mx-auto">
//     <div className="h-32 w-full relative">
//       <img className="rounded-t-xl object-cover min-w-full min-h-full max-w-full max-h-full" src={image} alt="" />
//     </div>
//     <div className="px-4 py-4 bg-white rounded-b-xl dark:bg-gray-900">
//       <h4 className="font-bold py-0 text-s text-gray-400 dark:text-gray-500 uppercase">{type}</h4>
//       <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100">{title}</h2>
//       <p className="sm:text-sm text-s text-gray-500 mr-1 my-3 dark:text-gray-400">{text}</p>
//       <div className="flex items-center space-x-4">
//         <div className="w-10 h-10 relative">
//           <img src={authorAvatar} className="rounded-full object-cover min-w-full min-h-full max-w-full max-h-full" alt="" />
//         </div>
//         <h3 className="text-gray-500 dark:text-gray-200 m-l-8 text-sm font-medium">{author}</h3>
//       </div>
//     </div>
//   </Card>
// );

const Radar = () => {
    //   const homeItems = Store.useState(getHomeItems);
    //   const [showNotifications, setShowNotifications] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Función para dibujar las líneas en el canvas centrado
        const drawCenteredLines = (lineSpacing, centerX, centerY) => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.strokeStyle = 'white';
            context.lineWidth = 1;

            // Dibuja líneas verticales centradas
            for (let x = -centerX; x < centerX; x += lineSpacing) {
                context.beginPath();
                context.moveTo(centerX + x, 0);
                context.lineTo(centerX + x, canvas.height);
                context.stroke();
            }

            // Dibuja líneas horizontales centradas
            for (let y = -centerY; y < centerY; y += lineSpacing) {
                context.beginPath();
                context.moveTo(0, centerY + y);
                context.lineTo(canvas.width, centerY + y);
                context.stroke();
            }
        };

        // Calcula el centro del canvas
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Llama a la función de dibujo inicial centrado
        drawCenteredLines(20, centerX, centerY);

        // Agrega un evento de zoom (simulado)
        const handleZoom = () => {
            const zoomLevel = 1 /* calcula tu nivel de zoom */;
            const lineSpacing = 20 / zoomLevel;
            drawCenteredLines(lineSpacing, centerX, centerY);
        };

        // Ejemplo de evento de zoom simulado
        window.addEventListener('wheel', handleZoom);

        // Limpieza del efecto al desmontar el componente
        return () => {
            window.removeEventListener('wheel', handleZoom);
        };
    }, []);

    return (
        <IonPage>
            <IonContent className={styles.greenBackground} fullscreen>
                <canvas
                    ref={canvasRef}
                    width="1000"
                    height={window.innerHeight - 56} // Ajusta la altura según el tamaño del viewport
                />
            </IonContent>
        </IonPage>
    );
};

export default Radar;
