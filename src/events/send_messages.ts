import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { TextChannel, APIEmbedField, RequestManager } from "discord.js";
import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";

export class ReadyEvent extends Event {
  constructor(client: ShewenyClient) {
    super(client, "ready", {
      description: "Client is logged in",
      once: true,
      emitter: client,
    });
  }

  async execute() {
    // if(true) return;
    //     const channel = this.client.channels.cache.get(
    //       "1129936526306967644"
    //     ) as TextChannel;
    //     if (!channel) return;
    //     const forumMakeBetter = this.client.channels.cache.get(
    //       "1129937161769193472"
    //     ) as TextChannel;
    //     const embed = new EmbedBuilder()
    //       .setColor("#2b2d31")
    //       .setDescription(
    //         `# Notre vocation comme groupe.\n
    //             ## <:Fichier29emotesdiose:1124453982161616976> Inspirer et permettre à vos idées de se concrétiser en exploitant nos solutions innovantes.\n\n\n<:Fichier54emotesdiose:1126281513709875200>**L'ensemble** de nos plateformes d'entraides sont pensées pour vous donner les clés en main afin de créer les meilleurs projets possibles. Nous souhaitons répondre aux besoins dans les differentes taches telles que la **gestion, la personnalisation de votre identité, l'amélioration de vos performances** et bien d'autres.\n\n<:Fichier54emotesdiose:1126281513709875200>**Nos solutions** sont entretenues régulièrement par l'implémentation de **mises à jours, ajouts et fonctionnalités innovantes**. Que vous pouvez retrouver parmi cette liste de forums qui les présentent en détails :
    // ${forumMakeBetter}\n\n<:Fichier54emotesdiose:1126281513709875200>**Vous pouvez** aussi consulter nôtre site internet https://diose.io/ dédié au groupe.\n\n<:Fichier54emotesdiose:1126281513709875200>**Notez qu'une Foire aux Questions** est disponible dans le channel ⁠faq.
    //           `
    //       )
    //       .setImage(
    //         "https://media.discordapp.net/attachments/911580109151019028/1127693361155944559/Plan_de_travail_125.png?width=555&height=27"
    //       )
    //       .setFooter({
    //         text: "Diose 2023-2024 | Clique ci-dessous pour obtenir des informations complémentaires !",
    //       });
    //     const row = new ActionRowBuilder()
    //       .addComponents(
    //         new ButtonBuilder()
    //           .setCustomId("DISPLAY_RULES")
    //           .setLabel("Règles")
    //           .setStyle(ButtonStyle.Danger)
    //           .setEmoji("<:Fichier57emotesdiose:1127733394596430025>")
    //       )
    //       .addComponents(
    //         new ButtonBuilder()
    //           .setCustomId("DISPLAY_RESOURCES")
    //           .setLabel("Ressources")
    //           .setStyle(ButtonStyle.Primary)
    //           .setEmoji("<:Fichier65emotesdiose:1127733448052834454>")
    //       )
    //       .addComponents(
    //         new ButtonBuilder()
    //           .setCustomId("DISPLAY_LINKS")
    //           .setLabel("Liens")
    //           .setStyle(ButtonStyle.Success)
    //           .setEmoji("<:Fichier71emotesdiose:1127733456735060018>")
    //       )
    //       .addComponents(
    //         new ButtonBuilder()
    //           .setCustomId("DISPLAY_ENGLISH_VERSION")
    //           .setLabel("English")
    //           .setStyle(ButtonStyle.Secondary)
    //           .setEmoji("🇬🇧")
    //       );
    //     channel.send({
    //       embeds: [embed],
    //       files: ["assets/images/informations.png"],
    //       components: [row as any],
    //     });
    //     const faqChannel = this.client.channels.cache.get(
    //       "1129941578656526387"
    //     ) as TextChannel;
    //     if (!faqChannel) return;
    //     const aideBug = this.client.channels.cache.get(
    //       "1048733359578300548"
    //     ) as TextChannel;
    //     const embed1 = new EmbedBuilder().setColor("#2b2d31").setDescription(
    //       `## <:Fichier27emotesdiose:1124453977531101244> Foire aux questions à propos de Diose !
    //             - Ici sont répertoriées toutes les informations qui nous sont le plus demandées par rapport au groupe Diose et ses projets.`
    //     );
    //     const embed2 = new EmbedBuilder()
    //       .setColor("#2b2d31")
    //       .setDescription(
    //         `### <:Fichier54emotesdiose:1126281513709875200>Pourquoi Diose et pas d'autres ?
    // Nous sommes toujours à votre écoute, à l'écoute de vos ressentis et idées. Nous sommes actifs, autant dans le chat ou vous pouvez interpeler nos équipes rapidement. Mais aussi dans le contenu ! Diose est un groupe dirigé par deux leaders qui ont pour but de toujours prévoir une suite. Cette suite doit toujours avoir pour vocation l'utilité et l'innovation. Nous sommes toujours les plus transparants, nous adoptons une rigueur alliée à une discipline qui nous permet de vous proposer toujours plus de contenu qualitatif et très affiné, dont des features uniques à nos projets pour vous plaira ! Diose met en place continuellement de nouvelles mises à jours, patch, ajouts et nouveautés exclusives à nos projets.
    // ### <:Fichier54emotesdiose:1126281513709875200>Comment signaler un bug ?
    // C'est simple, il vous suffit de poster un message dans ${aideBug} expliquant précisément l'erreur/bug avec un screen à l'appui si possible et l'équipe de Diose s'en chargera et vous aidera.
    // ### <:Fichier54emotesdiose:1126281513709875200>Comment se passe l'entretien des projets de Diose ?
    // Nos solutions sont toujours créées dans un but d'innover et de proposer quelque chose d'original et complet qui répond à vos besoins, ainsi la création, production de ces solutions peuvent mettre plusieurs mois de développement, cela dépend principalement de nos effectifs, du temps disponible et des idées. Néanmoins, même si nous ne communiqueront pas sur quelque chose d'inachevé/non réalisé, vous pouvez être sur qu'on proposera toujours une suite.
    // ### <:Fichier54emotesdiose:1126281513709875200>Comment est-ce que nous pouvons devenir partenaire du groupe ?
    // Pour proposer un partenariat, vous devez souscrire au programme partner disponible sur https://diose.io/requests. Il vous est obligatoire de respecter certaines conditions et de répondre clairement aux questions.
    // ### <:Fichier54emotesdiose:1126281513709875200>Est-ce que l'équipe de Diose recrute-elle toujours ?
    // Oui bien-sûr, vous pouvez notamment postuler en respectant conditions et en candidatant clairement via https://diose.io/hire. Vous n'aurez qu'à répondre aux questions et à postuler.
    // ### <:Fichier54emotesdiose:1126281513709875200>Je veux proposer à Diose de créer un projet ensemble
    // Nous proposer vos idées à réaliser c’est possible. Nous vous invitons à ⁠Inconnu pour nous présenter votre idée. Néanmoins, notez que vos projets doivent etre uniques, originales ou que leur qualité soit élevée ! Votre présentation doit être précise et complète, et se doit d’expliciter un plan qui résume votre stratégies, idées qui vous plaisent et concept.
    // ### <:Fichier54emotesdiose:1126281513709875200>Y'a t'il des tutos concernant l'utilisation des platformes ?
    // Pas d'inquiétudes, cela est prévu. Normalement nous opterons pour deux format, un format type article et le format vidéo. Nous essayerons d'être les plus clairs et concis possibles. Néanmoins si une question persiste vous pouvez faire appel à l'équipe de modération dans le #général. Les tutoriels sont tous disponibles et mentionnés dans les forums dédiés aux projets.
    // ### <:Fichier54emotesdiose:1126281513709875200>Vers quel(s) public(s) Diose tend-t'il ?
    // Dans notre statégie actuelle, nous cherchons à interesser le maximum d'utilisateurs tentés par ce qu'on propose. On penche alors sur les communautés françaises mais aussi anglaises, ainsi le respect des deux langues et des interlocuteurs est primordiale.
    // ### <:Fichier54emotesdiose:1126281513709875200>À quoi correspondent les Betas Tests ?
    // Ces betas tests correspondent à un accès en avant première à certains éléments de notre avancement qui n'est partagé qu'à un nombre limité d'utilisateurs. Ces conditions varient parfois mais sont toujours explicités. Les Betas Test servent notamment d'aide à l'équipe quant au fixe de certains bugs non-anticipés avant que le(s) projet soit disponible pour tous.
    // `
    //       )
    //       .setFooter({
    //         text: "Si des questions persistent, n'hésitez pas à nous soliciter :D",
    //         iconURL:
    //           "https://media.discordapp.net/attachments/1041410221039431731/1126866594782531724/Diose_Logo.png",
    //       });
    //     faqChannel.send({
    //       embeds: [embed1, embed2],
    //     });
    // const partnersChannel = this.client.channels.cache.get(
    //   "1129953727558721626"
    // ) as TextChannel;
    // if (!partnersChannel) return;
    // const embed = new EmbedBuilder()
    //   .setColor("#2b2d31")
    //   .setTitle("Server Analytics")
    //   .setDescription(
    //     `📊 Server Analytics est un bot de statistiques qui permet de récolter, analyser et visualiser les stats de son serveur à l'aide de graphiques, images et cartes. Il permet d'afficher l'évolution de votre serveur, des classements, vos statistiques personnelles ou encore des compteurs pour vos salons !
    //     [Ajoutez Server Analytics sans attendre sur vôtre propre serveur !](https://discord.com/oauth2/authorize?client_id=634452894636310567&scope=bot&permissions=319560)`
    //   )
    //   .setThumbnail(
    //     "https://media.discordapp.net/attachments/891591919648538654/997792902988177418/imageonline-co-roundcorner_3.png?width=675&height=675"
    //   )
    //   .setImage("https://i.imgur.com/kdJejsd.png");
    //     const embed2 = new EmbedBuilder()
    //       .setColor("#2b2d31")
    //       .setTitle("Center of Creators")
    //       .setDescription(
    //         `💻 Center Of Creators est un serveur discord ayant pour vocation de regrouper des passionné(e)s ainsi que des créateurs de projet autour de la programmation et du graphisme.
    //     [Rejoignez Center of Creators !](https://discord.gg/center-of-creators-905776576363397190)`
    //       )
    //       .setThumbnail(
    //         "https://cdn.discordapp.com/avatars/857605987812507699/216aa3a66ffd696cbd7d99b46318101a.webp?size=96"
    //       )
    //       .setImage("https://i.imgur.com/kdJejsd.png");
    //     const embed3 = new EmbedBuilder()
    //       .setColor("#2b2d31")
    //       .setTitle("Driveo")
    //       .setDescription(
    //         `
    //   🔋 Driveo est un cloud qui vous permet de stocker vos fichiers et d'y accéder de n'importe où, à tout moment, depuis n'importe quel appareil connecté à Internet. Vous pouvez également partager des fichiers avec d'autres et collaborer avec eux en temps réel. Driveo propose 25 Go d'espace de stockage gratuit.
    //   [Accéder à Driveo Cloud !](https://driveo.cloud/)`
    //       )
    //       .setThumbnail(
    //         "https://cdn.discordapp.com/avatars/1110511479125450752/db4a7ed757bc9d21e7f08fde1f419a6f.webp?size=96"
    //       )
    //       .setImage("https://i.imgur.com/kdJejsd.png");
    //   const embed4 = new EmbedBuilder()
    //     .setColor("#2b2d31")
    //     .setDescription(
    //       `
    //     ## <:Fichier73emotesdiose:1127733688545841292> Nos partenaires qui soutiennent Diose !
    //     <:Fichier54emotesdiose:1126281513709875200> Découvre leur présentation, qui te mènera respectivement à leurs projets projets.
    //     <:Fichier57emotesdiose:1127733394596430025> Si tu souhaites proposer un possible partenariat avec Diose, tu peux créer un ticket !
    //   `
    //     )
    //     .setImage(
    //       "https://media.discordapp.net/attachments/911580109151019028/1127693361155944559/Plan_de_travail_125.png?width=407&height=19"
    //     );
    // partnersChannel.send({
    //   embeds: [embed, embed2, embed3, embed4],
    // });
  }
}
