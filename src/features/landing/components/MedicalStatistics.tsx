
import React from 'react';
import { motion } from 'framer-motion';

const MedicalStatistics: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
    >
      <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-white/20">
        <div className="text-xl font-bold text-primary mb-1">85%</div>
        <div className="text-xs text-muted-foreground">des cas liés à l'hypertension</div>
      </div>
      <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-white/20">
        <div className="text-xl font-bold text-primary mb-1">60%</div>
        <div className="text-xs text-muted-foreground">évitables par la prévention</div>
      </div>
      <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-white/20">
        <div className="text-xl font-bold text-primary mb-1">40%</div>
        <div className="text-xs text-muted-foreground">d'augmentation en milieu urbain</div>
      </div>
    </motion.div>
  );
};

export default MedicalStatistics;
