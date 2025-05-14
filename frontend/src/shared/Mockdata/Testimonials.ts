export interface TestimonialProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  text: string;
  service: string;
}

export const testimonials: TestimonialProps[] = [
  {
    id: "1",
    name: "Lan Phương",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    service: "Aromatherapy Massage",
    text: "An absolutely relaxing experience. The scents, the atmosphere, and the care—I felt truly recharged.",
  },
  {
    id: "2",
    name: "Minh Tuấn",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    service: "Deep Tissue Massage",
    text: "Strong hands, professional service. Helped relieve my back pain after weeks of stress.",
  },
  {
    id: "3",
    name: "Thảo Vy",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    rating: 5,
    service: "Facial Treatment",
    text: "My skin feels so fresh and smooth! Definitely coming back before my next event.",
  },
  {
    id: "4",
    name: "Ngọc Hân",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 5,
    service: "Hot Stone Therapy",
    text: "I’ve never felt so at peace. The warmth of the stones melted all the tension away.",
  },
  {
    id: "5",
    name: "Hoàng Nam",
    image: "https://randomuser.me/api/portraits/men/64.jpg",
    rating: 4,
    service: "Body Scrub & Wrap",
    text: "Excellent service, though I wish the session was a bit longer. Great staff!",
  },
  {
    id: "6",
    name: "Mai Chi",
    image: "https://randomuser.me/api/portraits/women/58.jpg",
    rating: 5,
    service: "Herbal Steam Sauna",
    text: "The herbs reminded me of home in the countryside. Such a healing and nostalgic moment.",
  },
  {
    id: "7",
    name: "Anh Dũng",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    rating: 5,
    service: "Foot Reflexology",
    text: "Incredible foot massage! I could feel the stress draining from my whole body.",
  },
  {
    id: "8",
    name: "Khánh Linh",
    image: "https://randomuser.me/api/portraits/women/37.jpg",
    rating: 5,
    service: "Couples Massage",
    text: "My partner and I had the best anniversary gift here. So peaceful and romantic.",
  },
  {
    id: "9",
    name: "Trọng Nhân",
    image: "https://randomuser.me/api/portraits/men/23.jpg",
    rating: 4,
    service: "Hair & Scalp Treatment",
    text: "Didn’t expect my scalp massage to be this good. Felt like a new person afterwards.",
  },
  {
    id: "10",
    name: "Bích Thủy",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 5,
    service: "Detox Package",
    text: "From the tea to the body wrap—everything was perfect. A complete reset for my mind and body.",
  },
];
