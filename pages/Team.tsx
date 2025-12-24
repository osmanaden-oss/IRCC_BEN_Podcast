import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { TeamMember } from '../types';
import { Linkedin, Globe, Twitter } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export const Team = () => {
  const { t, language } = useTranslation();
  
  // ============================================
  // BILINGUAL TEAM DATA
  // ============================================
  
  const teamDataEN = [
    { 
      id: '1', 
      name: 'Osman Aden ', 
      role: 'Project Lead and Co-Host', 
      photo_url: 'https://i.imgur.com/blMC0Eq.jpg',
      bio: 'Osman is the current lead for the Podcast initiative presented by the Black Employee Network of IRCC. An enthusiastic member since its inauguration in 2022, he was previously with the Black Advancement and Engagement Team (BEAT) at ESDC. A proud Francophone and Muslim, Osman has over 7 years of federal government experience advocating for Black community issues. He serves as a Research and Evaluation Officer in IRCC\'s Statistical Reporting Group, contributing to evidence-based decision-making through data analysis and reporting.', 
      order_index: 1,
      social_links: {
        linkedin: 'https://ca.linkedin.com/in/osman-aden-osman-64558a60',
        twitter: null,
        website: null
      }
    },
    { 
      id: '2', 
      name: 'Nadine Hall', 
      role: 'Host', 
      photo_url: 'https://i.imgur.com/NjsMXIr.jpg',
      bio: 'Nadine has a love for public speaking and is known for her "gift of the gab." As one of the original Executive team members of the inaugural BEN, she has been actively engaged in presenting at BEN events at IRCC, engaging with BEN members, and participating in BEN projects. With a strong desire to connect, the podcast is one of her favorite ways to engage members. Currently a Program Support for the Immigration Operations Branch, Nadine has held various roles including Executive Administrative Assistant and Junior Analyst for the Case Management Branch since joining IRCC in 2016.', 
      order_index: 2,
      social_links: {
        linkedin: null,
        twitter: null,
        website: null
      }
    },
    { 
      id: '3', 
      name: 'Sarah Parks', 
      role: 'Coordinator', 
      photo_url: 'https://i.imgur.com/MhLF77s.jpg',
      bio: 'Sarah enjoys being part of larger initiatives and support communities. A BEN member since spring 2024, she has been actively engaged in the podcast initiative. As a former teacher and advocate, Sarah explores new interests through collaborative conversation. She joined to connect with like-minded individuals and currently works as a Program Specialist in the Digital Strategy Branch. Sarah has held various IRCC positions including Program Officer in Case Management Branch, ROC-O, and International Network since 2019.', 
      order_index: 3,
      social_links: {
        linkedin: null,
        twitter: null,
        website: null
      }
    },
    { 
      id: '4', 
      name: 'Waris Dualeh', 
      role: 'Coordinator', 
      photo_url: 'https://i.imgur.com/BJDkLZS.jpg',
      bio: 'Waris Dualeh is a storyteller at heart with a love for bringing meaningful conversations to life. Based in Ottawa, she blends her background in media and public service to help bring meaningful voices and conversations to the forefront. As a member of the BEN Podcast team, Waris contributes her expertise in coordination, storytelling, and content support to help amplify authentic narratives within the Black public service community. She is dedicated to fostering thoughtful dialogue and elevating voices that drive meaningful change & spotlight stories that inspire and empower.', 
      order_index: 4,
      social_links: {
        linkedin: null,
        twitter: null,
        website: null
      }
    },
    { 
      id: '5', 
      name: 'Zahria Morgan', 
      role: 'Editor', 
      photo_url: 'https://i.imgur.com/mCJ1Yg5.jpg',
      bio: 'Zahria has a deep passion for storytelling through visuals, specializing in photography, videography, and post-production. With an eye for capturing moments and emotions, she transforms ordinary scenes into extraordinary visual narratives through perfect shots, refined footage, and seamless edits. Joining BEN in 2022 to connect with like-minded innovators, Zahria brings creative and logistical perspectives to BEN initiatives, offering fresh insights and streamlining processes while fostering collaboration.', 
      order_index: 5,
      social_links: {
        linkedin: null,
        twitter: null,
        website: null
      }
    },
    { 
      id: '6', 
      name: 'Emily Mostovac Walsh', 
      role: 'Support', 
      photo_url: 'https://i.imgur.com/fL4lELw.jpg',
      bio: 'Emily is a Communications and Events Advisor at IRCC, working in Internal Communications on the Executive Events team. Previously in public opinion research and Internal Communications on employee wellness, people management, and anti-racism, diversity, equity, and inclusion files, Emily has worked in Communications across departments since 2016. From a multiracial family passionate about equity-deserving groups, she is an active member of several IRCC employee networks. When not working, Emily enjoys family walks in Gatineau, QC, art, baking, and audiobooks.', 
      order_index: 6,
      social_links: {
        linkedin: null,
        twitter: null,
        website: null
      }
    },
    { 
      id: '7', 
      name: 'Yrvaki Colon', 
      role: 'Translation Support', 
      photo_url: 'https://i.imgur.com/UthvtEO.jpg', 
      bio: 'Yrvaki started at IRCC in 2013 at the client support centre, gaining knowledge across immigration programs. Her passion for diversity, equity, and inclusion led her to create the United Shades Committee in 2021 within the call centre—a space free of racism toward Black, Indigenous, and people of color. Actively involved in BEN since 2022, her committee remains an ally. Now in International Affairs, Yrvaki continues increasing bias awareness and encouraging positive exchange on systemic racism at all levels.', 
      order_index: 7,
      social_links: {
        linkedin: null,
        twitter: null,
        website: null
      }
    },
  ];

  const teamDataFR = [
    { 
      id: '1', 
      name: 'Osman Aden Osman', 
      role: 'Chef de projet et co‑animateur', 
      photo_url: 'https://i.imgur.com/blMC0Eq.jpg',
      bio: 'Osman est actuellement responsable de l\'initiative Podcast présentée par le Réseau des employés noirs de l\'IRCC. Il est un membre enthousiaste et actif de ce réseau depuis sa création en 2022. Ancien membre de l\'équipe BEAT (Black Advancement and Engagement Team) de l\'ESDC, Osman est et reste un francophone engagé et un fier membre de la communauté musulmane. Avec plus de 7 ans d\'expérience au sein du gouvernement fédéral, il n\'a cessé de défendre les questions sociales qui touchent la communauté noire. Osman occupe le poste d\'agent de recherche et d\'évaluation au sein du groupe de rapports statistiques de la direction de la recherche et des données de l\'IRCC, où il contribue à la prise de décisions fondées sur des données probantes grâce à l\'analyse et à la communication de données.', 
      order_index: 1,
      social_links: {
        linkedin: null,
        twitter: null,
        website: null
      }
    },
    { 
      id: '2', 
      name: 'Nadine Hall', 
      role: 'Animatrice', 
      photo_url: 'https://i.imgur.com/NjsMXIr.jpg',
      bio: 'Nadine adore parler en public et est connue pour son « don de la parole ». En tant que membre fondatrice de l\'équipe de direction du REN, Nadine a participé activement à diverses présentations lors d\'événements du REN à l\'IRCC, a collaboré avec les membres du REN et a pris part à de nombreux projets du REN. Nadine souhaite vivement entrer en contact et échanger avec les membres du REN, et le balado est l\'un de ses moyens préférés pour y parvenir. Nadine travaille actuellement comme soutien de programme pour la Direction générale des opérations d\'immigration et a occupé divers postes, notamment celui d\'adjointe administrative de direction et d\'analyste junior pour la Direction générale de la gestion des cas depuis qu\'elle a rejoint l\'IRCC en 2016.', 
      order_index: 2,
      social_links: {
        linkedin: null,
        twitter: null,
        website: null
      }
    },
    { 
      id: '3', 
      name: 'Sarah Parks', 
      role: 'Coordinatrice', 
      photo_url: 'https://i.imgur.com/MhLF77s.jpg',
      bio: 'Sarah a toujours aimé participer à des initiatives d\'envergure, des réseaux et des communautés de soutien. Membre du REN depuis le printemps 2024, elle s\'implique activement en tant que membre générale et dans l\'initiative de balado du REN. Ancienne enseignante et défenseure, Sarah aime explorer de nouveaux centres d\'intérêt par le biais de conversations collaboratives. Elle s\'est jointe à l\'équipe pour découvrir de nouvelles façons de se connecter avec des personnes partageant les mêmes valeurs. Sarah travaille actuellement comme spécialiste de programme à la Direction de la stratégie numérique et a occupé divers postes à IRCC depuis 2019, notamment celui d\'agente de programme à la Direction de la gestion des cas, au ROC-O et au Réseau international.', 
      order_index: 3,
      social_links: {
        linkedin: null,
        twitter: null,
        website: null
      }
    },
    { 
      id: '4', 
      name: 'Waris Dualeh', 
      role: 'Coordinatrice', 
      photo_url: 'https://i.imgur.com/BJDkLZS.jpg',
      bio: 'Waris Dualeh est une conteuse dans l\'âme, passionnée par l\'art de donner vie à des conversations significatives. Basée à Ottawa, elle allie son expérience en médias et en fonction publique pour mettre en lumière des voix et des échanges qui comptent. En tant que membre de l\'équipe du balado du REN, Waris apporte son expertise en coordination, en narration et en soutien au contenu afin de amplifier des récits authentiques au sein de la communauté noire de la fonction publique. Elle s\'engage à favoriser un dialogue réfléchi et à mettre en valeur des voix qui inspirent le changement et des histoires qui motivent et responsabilisent.', 
      order_index: 4,
      social_links: {
        linkedin: null,
        twitter: null,
        website: null
      }
    },
    { 
      id: '5', 
      name: 'Zahria Morgan', 
      role: 'Technologie et Éditorial', 
      photo_url: 'https://i.imgur.com/mCJ1Yg5.jpg',
      bio: 'Zahria nourrit une passion profonde pour la narration visuelle, spécialisée en photographie, vidéographie et postproduction. Avec un sens aigu pour capturer les moments, les émotions et les scènes, elle exprime sa créativité à travers l\'objectif, transformant des instants ordinaires en récits visuels extraordinaires. Qu\'il s\'agisse de cadrer la photo parfaite, de peaufiner des séquences en postproduction ou de réaliser des montages fluides, Zahria excelle à transformer des idées en histoires captivantes qui laissent une impression durable. En 2022, Zahria a rejoint le REN dans le but de se connecter avec des personnes partageant sa passion pour l\'innovation et la collaboration. Désireuse de contribuer, elle apporte à la fois une perspective créative et logistique aux initiatives en cours du REN. Sa polyvalence lui permet d\'aborder les défis sous plusieurs angles, offrant des idées novatrices et aidant à optimiser les processus tout en favorisant un environnement collaboratif. Le REN lui a offert une plateforme pour grandir, apprendre et établir des liens significatifs qui continuent de façonner son parcours professionnel.', 
      order_index: 5,
      social_links: {
        linkedin: null,
        twitter: null,
        website: null
      }
    },
    { 
      id: '6', 
      name: 'Emily Mostovac Walsh', 
      role: 'Soutien', 
      photo_url: 'https://i.imgur.com/fL4lELw.jpg',
      bio: 'Emily est conseillère en communications et événements à Immigration, Réfugiés et Citoyenneté Canada (IRCC). Elle travaille actuellement en communications internes au sein de l\'équipe des événements de la haute direction. Elle a auparavant œuvré dans la recherche sur l\'opinion publique et en communications internes sur des dossiers liés au bien-être des employés, à la gestion des personnes ainsi qu\'à l\'antiracisme, la diversité, l\'équité et l\'inclusion. Emily travaille en communications pour divers ministères depuis 2016. Issue d\'une famille multiraciale, elle est passionnée par la défense des groupes en quête d\'équité. Elle a trois frères, dont l\'un travaille également à IRCC! Emily est membre active de plusieurs réseaux d\'employés à IRCC. En dehors du travail, elle passe du temps avec son mari, ses deux garçons qui la tiennent bien occupée, et ses animaux de compagnie (qui la tiennent tout autant occupée). Emily aime le bon café, les promenades familiales dans son quartier à Gatineau (QC), la création artistique, la pâtisserie et l\'écoute de livres audio.', 
      order_index: 6,
      social_links: {
        linkedin: null,
        twitter: null,
        website: null
      }
    },
    { 
      id: '7', 
      name: 'Yrvaki Colon', 
      role: 'Soutien à la traduction', 
      photo_url: 'https://i.imgur.com/UthvtEO.jpg', 
      bio: 'Yrvaki a commencé son parcours à IRCC en 2013 au centre de soutien à la clientèle, où elle a approfondi ses connaissances sur tous les programmes d\'immigration grâce à divers rôles et directions. Sa passion pour la diversité, l\'équité et l\'inclusion l\'a amenée à créer le comité United Shades en 2021 au sein du centre d\'appels, dont la mission est de créer un espace exempt de racisme et de préjugés envers les personnes noires, autochtones et autres personnes racisées. Active au sein du REN depuis sa création en 2022, son comité demeure un allié du REN. À mesure que sa carrière évolue du côté des affaires internationales d\'IRCC, elle continue de sensibiliser aux biais et d\'encourager les échanges positifs, à tous les niveaux, sur le racisme systémique.', 
      order_index: 7,
      social_links: {
        linkedin: null,
        twitter: null,
        website: null
      }
    },
  ];

  // ============================================
  // SELECT DATA BASED ON LANGUAGE
  // ============================================
  const teamData = language === 'fr' ? teamDataFR : teamDataEN;

  // ============================================
  // FETCH TEAM DATA FROM DATABASE
  // ============================================
  const { data: teamMembers, isLoading } = useQuery({
    queryKey: ['team', language], // Cache per language
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('order_index');
      
      // If table is empty (dev mode), return local bilingual data
      if (!data || data.length === 0) {
        return teamData;
      }
      
      // If DB has data, merge with local translations
      return data.map(dbMember => 
        teamData.find(m => m.id === dbMember.id) || dbMember
      ) as TeamMember[];
    }
  });

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="min-h-screen bg-ben-black/95">
      {/* Hero Section */}
      <div className="text-center mb-20 px-6 py-16 md:py-20">
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
          {t('team.title_prefix')} 
          <span className="text-ben-terracotta">{t('team.title_highlight')}</span>
        </h1>
        <p className="max-w-2xl mx-auto text-ben-sand text-lg leading-relaxed">
          {t('team.description')}
        </p>
      </div>

      {/* Team Members Grid */}
      <div className="px-6 md:px-12 lg:px-16 py-12">
        {isLoading ? (
          <div className="text-center text-ben-gold text-lg py-20">
            {t('team.loading')}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {teamMembers?.map((member) => (
              <div key={member.id} className="group relative h-full">
                {/* Card Background Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-b from-transparent to-ben-terracotta/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm" />
                
                {/* Main Card */}
                <div className="glass-panel rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:-translate-y-2 relative z-10">
                  
                  {/* Photo Section */}
                  <div className="w-full aspect-[3/4] overflow-hidden relative">
                    <div className="absolute inset-0 bg-ben-brown/20 mix-blend-overlay z-10" />
                    <img 
                      src={member.photo_url || ''} 
                      alt={member.name}
                      className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Bio Section */}
                  <div className="p-6 flex-1 flex flex-col relative z-20">
                    {/* Name & Role */}
                    <div className="mb-2">
                      <h3 className="text-2xl font-display font-bold text-white leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-ben-gold text-sm font-medium uppercase tracking-widest mt-1">
                        {member.role}
                      </p>
                    </div>
                    
                    {/* Bio Text - Bilingual */}
                    <p className="text-ben-sand/80 mt-4 mb-6 text-sm leading-relaxed flex-grow transition-all duration-500">
                      {member.bio}
                    </p>
                    
                    {/* Social Links */}
                    <div className="flex gap-4 pt-4 border-t border-ben-brown/20">
                      {member.social_links?.linkedin && (
                        <a 
                          href={member.social_links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ben-sand hover:text-ben-gold transition-colors duration-300"
                          aria-label="LinkedIn"
                        >
                          <Linkedin size={18} />
                        </a>
                      )}
                      {member.social_links?.twitter && (
                        <a 
                          href={member.social_links.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ben-sand hover:text-ben-gold transition-colors duration-300"
                          aria-label="Twitter"
                        >
                          <Twitter size={18} />
                        </a>
                      )}
                      {member.social_links?.website && (
                        <a 
                          href={member.social_links.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ben-sand hover:text-ben-gold transition-colors duration-300"
                          aria-label="Website"
                        >
                          <Globe size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
