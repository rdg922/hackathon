import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Section ({ id, children }) {
  const { ref, inView } = useInView({
    threshold: 0.1, // Adjust this value according to your needs
  });

  useEffect(() => {
    if (inView) {
      // Handle the "locking" action here, e.g., updating a state to indicate the active section
      console.log(`${id} is now in view`);
    }
  }, [inView, id]);

  return (
    <section ref={ref} id={id} className="min-h-screen">
      {children}
    </section>
  );
};