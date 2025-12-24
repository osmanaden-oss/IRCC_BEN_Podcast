import React from 'react';
import { useTranslation } from '../hooks/useTranslation';


export const Contact = () => {
  const { t } = useTranslation();


  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-12xl md:text-14xl font-display font-bold mb-4">{t('contact.title')}</h1>
        <p className="text-ben-sand">{t('contact.subtitle')}</p>
      </div>


      <div className="grid md:grid-cols-3 gap-8">
         {/* Info Side */}
         <div className="md:col-span-1 space-y-6">
            <div className="p-6 rounded-xl bg-ben-black/40 backdrop-blur-md">
               <h3 className="text-ben-gold font-bold mb-2">{t('contact.email_label')}</h3>
               <p className="text-ben-sand/80 text-sm">IRCC.BlackEmployeeNetwork-ReseauEmplyeNoir.IRCC@cic.gc.ca</p>
            </div>
            <div className="p-6 rounded-xl bg-ben-black/40 backdrop-blur-md">
               <h3 className="text-ben-gold font-bold mb-2">{t('contact.connect_label')}</h3>
               <p className="text-ben-sand/80 text-sm" dangerouslySetInnerHTML={{ __html: t('contact.connect_text') }}></p>
            </div>
         </div>


         {/* Video */}
         <div className="md:col-span-2">
            <div className="rounded-2xl overflow-hidden relative w-full bg-black">
              <video 
                width="100%" 
                height="100%" 
                autoPlay
                muted
                loop
                className="w-full h-auto block relative z-0"
              >
                <source src="https://i.imgur.com/JJ8Pgm7.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Black overlay bar to hide "Dreaming AI" text - responsive across all devices */}
              <div className="absolute inset-x-0 bottom-0 h-[4.92%] min-h-6 bg-black rounded-b-2xl z-10"></div>
            </div>
         </div>
      </div>
    </div>
  );
};
