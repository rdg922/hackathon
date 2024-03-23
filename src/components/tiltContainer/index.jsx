import {motion} from "framer-motion"

export default function TiltContainer({children}) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            onMouseMove={(e) => {
                const tiltX = (e.clientY / window.innerHeight - 0.5) * 100;
                const tiltY = (e.clientX / window.innerWidth - 0.5) * 100;
                e.target.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            }}
        >
            {children}
        </motion.div>
    )
}