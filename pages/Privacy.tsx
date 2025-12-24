import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Privacy = () => {
  const { language } = useLanguage();

  if (language === 'fr') {
    return (
      <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 rounded-2xl border border-ben-gold/10">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">Politique de confidentialité</h1>
        <div className="space-y-6 text-ben-sand/90 leading-relaxed">
          <p className="text-sm text-ben-sand/60 mb-8">Dernière mise à jour : {new Date().toLocaleDateString()}</p>

          <section>
              <h2 className="text-xl font-display font-bold text-ben-gold mb-3">1. Introduction</h2>
              <p>
              Le Podcast REN ("nous", "notre", "nos") s'engage à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons et partageons les informations vous concernant lorsque vous utilisez notre site web (le "Service").
              </p>
          </section>

          <section>
              <h2 className="text-xl font-display font-bold text-ben-gold mb-3">2. Informations que nous collectons</h2>
              <p className="mb-2">
              Nous pouvons collecter des informations personnelles que vous nous fournissez directement, comme lorsque vous vous abonnez à notre newsletter ou utilisez notre formulaire de contact. Ces informations peuvent inclure :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-ben-sand/80">
                  <li>Nom</li>
                  <li>Adresse email</li>
                  <li>Toute autre information que vous choisissez de fournir</li>
              </ul>
              <p className="mt-2">
              Nous pouvons également collecter automatiquement des informations non personnelles lorsque vous naviguez sur le site, telles que votre adresse IP, votre type de navigateur et votre système d'exploitation.
              </p>
          </section>
          
          <section>
              <h2 className="text-xl font-display font-bold text-ben-gold mb-3">3. Comment nous utilisons vos informations</h2>
              <p className="mb-2">
              Nous utilisons les informations que nous collectons pour :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-ben-sand/80">
                  <li>Fournir, maintenir et améliorer notre Service.</li>
                  <li>Vous envoyer des newsletters et autres communications marketing auxquelles vous avez souscrit.</li>
                  <li>Répondre à vos commentaires, questions et demandes.</li>
                  <li>Surveiller et analyser les tendances, l'utilisation et les activités en relation avec notre Service.</li>
              </ul>
          </section>

          <section>
              <h2 className="text-xl font-display font-bold text-ben-gold mb-3">4. Politique sur les cookies</h2>
              <p>
              Nous pouvons utiliser des cookies et des technologies de suivi similaires pour suivre l'activité sur notre Service et conserver certaines informations. Les cookies sont des fichiers contenant une petite quantité de données qui peuvent inclure un identifiant unique anonyme. Vous pouvez demander à votre navigateur de refuser tous les cookies ou d'indiquer quand un cookie est envoyé.
              </p>
          </section>
          
          <section>
              <h2 className="text-xl font-display font-bold text-ben-gold mb-3">5. Partage des données</h2>
              <p>
              Nous ne vendons, n'échangeons ni ne transférons autrement vos informations personnellement identifiables à des tiers. Cela n'inclut pas les tiers de confiance qui nous aident à exploiter notre site web ou à mener nos activités, tant que ces parties acceptent de garder ces informations confidentielles.
              </p>
          </section>

          <section>
              <h2 className="text-xl font-display font-bold text-ben-gold mb-3">6. Droits de l'utilisateur et protection des données</h2>
              <p>
              Vous avez le droit d'accéder, de mettre à jour ou de supprimer les informations personnelles que nous détenons sur vous. Si vous souhaitez exercer ces droits, veuillez nous contacter. Nous prenons des mesures raisonnables pour aider à protéger les informations vous concernant contre la perte, le vol, l'utilisation abusive et l'accès non autorisé.
              </p>
          </section>
          
          <section>
              <h2 className="text-xl font-display font-bold text-ben-gold mb-3">7. Coordonnées pour les questions de confidentialité</h2>
              <p>
              Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité, veuillez nous contacter à :
              </p>
              <p className="mt-2">
                  Email : <a href="mailto:privacy@benpodcast.com" className="text-ben-terracotta hover:text-white transition-colors">privacy@benpodcast.com</a>
              </p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 rounded-2xl border border-ben-gold/10">
      <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-ben-sand/90 leading-relaxed">
        <p className="text-sm text-ben-sand/60 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <section>
            <h2 className="text-xl font-display font-bold text-ben-gold mb-3">1. Introduction</h2>
            <p>
            The BEN Podcast ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our website (the "Service").
            </p>
        </section>

        <section>
            <h2 className="text-xl font-display font-bold text-ben-gold mb-3">2. Information We Collect</h2>
            <p className="mb-2">
            We may collect personal information that you provide to us directly, such as when you subscribe to our newsletter or use our contact form. This information may include:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-ben-sand/80">
                <li>Name</li>
                <li>Email address</li>
                <li>Any other information you choose to provide</li>
            </ul>
            <p className="mt-2">
            We may also collect non-personal information automatically as you navigate the site, such as your IP address, browser type, and operating system.
            </p>
        </section>
        
        <section>
            <h2 className="text-xl font-display font-bold text-ben-gold mb-3">3. How We Use Your Information</h2>
            <p className="mb-2">
            We use the information we collect to:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-ben-sand/80">
                <li>Provide, maintain, and improve our Service.</li>
                <li>Send you newsletters and other marketing communications you have opted into.</li>
                <li>Respond to your comments, questions, and requests.</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our Service.</li>
            </ul>
        </section>

        <section>
            <h2 className="text-xl font-display font-bold text-ben-gold mb-3">4. Cookie Policy</h2>
            <p>
            We may use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
        </section>
        
        <section>
            <h2 className="text-xl font-display font-bold text-ben-gold mb-3">5. Data Sharing</h2>
            <p>
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website or conducting our business, so long as those parties agree to keep this information confidential.
            </p>
        </section>

        <section>
            <h2 className="text-xl font-display font-bold text-ben-gold mb-3">6. User Rights and Data Protection</h2>
            <p>
            You have the right to access, update, or delete the personal information we have on you. If you wish to exercise these rights, please contact us. We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access.
            </p>
        </section>
        
        <section>
            <h2 className="text-xl font-display font-bold text-ben-gold mb-3">7. Contact Information for Privacy Inquiries</h2>
            <p>
            If you have any questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
                Email: <a href="mailto:privacy@benpodcast.com" className="text-ben-terracotta hover:text-white transition-colors">privacy@benpodcast.com</a>
            </p>
        </section>
      </div>
    </div>
  );
};
