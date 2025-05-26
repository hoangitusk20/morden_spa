import { Service } from "../type";

const services: Service[] = [
  {
    _id: "1",
    title: "Aromatherapy Massage",
    duration: 60,
    price: 100,
    image: "/images/services/service1.avif",
    description:
      "A relaxing massage with essential oils to calm your mind and rejuvenate your body.",
    detailDescription:
      "A soothing massage that combines gentle pressure with the therapeutic benefits of essential oils. This treatment promotes relaxation, reduces stress, and enhances overall well-being. Perfect for those seeking a tranquil escape from daily life.",

    category: "Massage",
  },
  {
    _id: "2",
    title: "Hot Stone Therapy",
    duration: 75,
    price: 130,
    image: "/images/services/service2.avif",
    description:
      "Therapeutic massage with heated stones to relieve muscle tension.",
    detailDescription:
      "Heated basalt stones are used to ease muscle tension and promote relaxation. The warmth penetrates deep into the muscles, improving circulation and reducing pain. Ideal for those with chronic aches or anyone needing a calming, full-body experience.",
    category: "Massage",
  },
  {
    _id: "3",
    title: "Facial Treatment",
    duration: 45,
    price: 90,
    image: "/images/services/service3.avif",
    description: "Deep cleansing facial to refresh and rejuvenate your skin.",
    detailDescription:
      "A deep-cleansing facial that removes impurities, exfoliates dead skin, and hydrates the face. It includes steam, extractions, a customized mask, and nourishing serums to refresh your skin and leave it glowing and smooth.",
    category: "Facial",
  },
  {
    _id: "4",
    title: "Deep Tissue Massage",
    duration: 90,
    price: 140,
    image: "/images/services/service2.avif",
    description:
      "A therapeutic massage that targets deep muscle layers to relieve chronic tension.",
    detailDescription:
      "Designed to target deeper layers of muscle and fascia, this massage relieves chronic pain and tension. Firm pressure and slow strokes are used to break up knots and restore mobility, making it ideal for active individuals or those with stiffness",
    category: "Massage",
  },

  {
    _id: "5",
    title: "Manicure & Pedicure",
    duration: 60,
    price: 50,
    image: "/images/services/service1.avif",
    description:
      "Pamper your hands and feet with a luxurious manicure and pedicure.",
    detailDescription:
      "A relaxing nail care session that includes soaking, trimming, exfoliating, and polishing. Hands and feet are pampered with massage and moisturizers, leaving them soft, clean, and refreshed. Choose from a wide range of polish colors.",
    category: "Nails",
  },
  {
    _id: "6",
    title: "Body Scrub",
    duration: 45,
    price: 75,
    image: "/images/services/service3.avif",
    description:
      "Exfoliating body scrub to remove dead skin cells and reveal smooth, glowing skin.",
    detailDescription:
      "A rejuvenating body scrub that exfoliates dead skin cells, unclogs pores, and improves circulation. Using natural ingredients like sugar or salt mixed with oils, this treatment leaves your skin feeling soft, smooth, and revitalized. Ideal for all skin types.",
    category: "Body",
  },
  {
    _id: "7",
    title: "Hydrating Facial",
    duration: 60,
    price: 120,
    image: "/images/services/service1.avif",
    description:
      "A facial treatment designed to deeply hydrate and replenish dry skin.",
    detailDescription:
      "A hydrating facial that uses nourishing masks and serums to restore moisture and elasticity to dry skin. This treatment includes cleansing, exfoliation, a hydrating mask, and a relaxing facial massage. Perfect for combating dryness and dullness.",
    category: "Facial",
  },
  {
    _id: "8",
    title: "Swedish Massage",
    duration: 60,
    price: 90,
    image: "/images/services/service3.avif",
    description:
      "A classic, gentle massage that promotes relaxation and improves circulation.",
    detailDescription:
      "A classic massage technique that uses long, flowing strokes to promote relaxation and improve circulation. This gentle massage is perfect for those new to massage or anyone looking to unwind and relieve stress. Ideal for relaxation and overall well-being.",
    category: "Massage",
  },
];

export default services;
