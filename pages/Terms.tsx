import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Terms = () => {
  const { language } = useLanguage();

  if (language === 'fr') {
    return (
      <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 rounded-2xl border border-ben-gold/10">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">Conditions générales</h1>
        <div className="space-y-6 text-ben-sand/90 leading-relaxed">
          <p className="text-sm text-ben-sand/60 mb-8">Dernière mise à jour : {new Date().toLocaleDateString()}</p>

          <section>
              <h2 className="text-xl font-display font-bold text-ben-gold mb-3">1. Acceptation des conditions</h2>
              <p>
              En accédant au site web du Podcast REN (le "Service") et en l'utilisant, vous acceptez d'être lié par les termes et dispositions de cet accord. De plus, lors de l'utilisation de ces services particuliers, vous serez soumis à toutes les directives ou règles affichées applicables à ces services.
              </p>
          </section>

          <section>
              <h2 className="text-xl font-display font-bold text-ben-gold mb-3">2. Propriété intellectuelle</h2>
              <p>
              Tout le contenu fourni sur ce site est à titre informatif uniquement. Les propriétaires de ce blog ne font aucune déclaration quant à l'exactitude ou à l'exhaustivité de toute information sur ce site ou trouvée en suivant tout lien sur ce site. Tous les droits de propriété intellectuelle concernant le contenu et la conception de ce site web appartiennent au Podcast REN.
              </p>
          </section>
          
          <section>
              <h2 className="text-xl font-display font-bold text-ben-gold mb-3">3. Conduite de l'utilisateur</h2>
              <p>
              Vous acceptez de ne pas utiliser le site web d'une manière qui :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-ben-sand/80">
                  <li>Est illégale, frauduleuse ou nuisible.</li>
                  <li>Enfreint toute loi ou réglementation locale, nationale ou internationale applicable.</li>
                  <li>Transmet ou procure l'envoi de toute publicité ou matériel promotionnel non sollicité ou non autorisé.</li>
              </ul>
          </section>

          <section>
              <h2 className="text-xl font-display font-bold text-ben-gold mb-3">4. Liens externes</h2>
              <p>
              Notre Service peut contenir des liens vers des sites web ou services tiers qui ne sont pas détenus ou contrôlés par le Podcast REN. Nous n'avons aucun contrôle sur le contenu, les politiques de confidentialité ou les pratiques de tout site web ou service tiers et n'assumons aucune responsabilité à leur égard.
              </p>
          </section>
          
          <section>
              <h2 className="text-xl font-display font-bold text-ben-gold mb-3">5. Avis de non-responsabilité</h2>
              <p>
              Les matériaux sur le site web du Podcast REN sont fournis "tels quels". Le Podcast REN ne donne aucune garantie, expresse ou implicite, et rejette par la présente et nie toutes les autres garanties, y compris, sans limitation, les garanties ou conditions implicites de qualité marchande, d'adéquation à un usage particulier, ou de non-violation de la propriété intellectuelle ou autre violation des droits.
              </p>
          </section>

          <section>
              <h2 className="text-xl font-display font-bold text-ben-gold mb-3">6. Modifications des conditions</h2>
              <p>
              Nous nous réservons le droit, à notre seule discrétion, de modifier ou de remplacer ces Conditions à tout moment. Ce qui constitue un changement matériel sera déterminé à notre seule discrétion.
              </p>
          </section>
          
          <section>
              <h2 className="text-xl font-display font-bold text-ben-gold mb-3">7. Coordonnées</h2>
              <p>
              Si vous avez des questions concernant ces Conditions, veuillez nous contacter à :
              </p>
              <p className="mt-2">
                  Email : <a href="mailto:contact@benpodcast.com" className="text-ben-terracotta hover:text-white transition-colors">contact@benpodcast.com</a>
              </p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 rounded-2xl border border-ben-gold/10">
      <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">Terms & Conditions</h1>
      <div className="space-y-6 text-ben-sand/90 leading-relaxed">
        <p className="text-sm text-ben-sand/60 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <section>
            <h2 className="text-xl font-display font-bold text-ben-gold mb-3">1. Acceptance of Terms</h2>
            <p>
            By accessing and using The BEN Podcast website (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
        </section>

        <section>
            <h2 className="text-xl font-display font-bold text-ben-gold mb-3">2. Intellectual Property</h2>
            <p>
            All content provided on this site is for informational purposes only. The owners of this blog make no representations as to the accuracy or completeness of any information on this site or found by following any link on this site. All intellectual property rights regarding the content and design of this website are owned by The BEN Podcast.
            </p>
        </section>
        
        <section>
            <h2 className="text-xl font-display font-bold text-ben-gold mb-3">3. User Conduct</h2>
            <p>
            You agree not to use the website in a way that:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-ben-sand/80">
                <li>Is unlawful, illegal, fraudulent or harmful.</li>
                <li>Breaches any applicable local, national or international law or regulation.</li>
                <li>Transmits, or procures the sending of, any unsolicited or unauthorised advertising or promotional material.</li>
            </ul>
        </section>

        <section>
            <h2 className="text-xl font-display font-bold text-ben-gold mb-3">4. External Links</h2>
            <p>
            Our Service may contain links to third-party web sites or services that are not owned or controlled by The BEN Podcast. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services.
            </p>
        </section>
        
        <section>
            <h2 className="text-xl font-display font-bold text-ben-gold mb-3">5. Disclaimer</h2>
            <p>
            The materials on The BEN Podcast's website are provided on an 'as is' basis. The BEN Podcast makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
        </section>

        <section>
            <h2 className="text-xl font-display font-bold text-ben-gold mb-3">6. Changes to Terms</h2>
            <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
            </p>
        </section>
        
        <section>
            <h2 className="text-xl font-display font-bold text-ben-gold mb-3">7. Contact Information</h2>
            <p>
            If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-2">
                Email: <a href="mailto:contact@benpodcast.com" className="text-ben-terracotta hover:text-white transition-colors">contact@benpodcast.com</a>
            </p>
        </section>
      </div>
    </div>
  );
};
