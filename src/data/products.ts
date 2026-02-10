import heroHeadphones from "@/assets/hero-headphones.jpg";
import productEarbuds from "@/assets/product-earbuds.jpg";
import productLaptop from "@/assets/product-laptop.jpg";
import productSmartwatch from "@/assets/product-smartwatch.jpg";
import productPowerbank from "@/assets/product-powerbank.jpg";
import productSpeaker from "@/assets/product-speaker.jpg";

export interface Accessory {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  shortDesc: string;
  fullReview: string;
  pros: string[];
  cons: string[];
  specs: Record<string, string>;
  affiliateLink: string;
  comparison: {
    competitor: string;
    items: { feature: string; ours: string; theirs: string }[];
  };
  accessories: Accessory[];
}

export const categories = [
  { id: "all", name: "Todos", icon: "Grid3X3" },
  { id: "audio", name: "Áudio", icon: "Headphones" },
  { id: "wearable", name: "Wearables", icon: "Watch" },
  { id: "computador", name: "Computadores", icon: "Laptop" },
  { id: "energia", name: "Energia", icon: "Zap" },
];

export const products: Product[] = [
  {
    id: "1",
    title: "SoundMax Pro X",
    category: "audio",
    price: 1899,
    rating: 4.8,
    image: heroHeadphones,
    shortDesc: "Cancelamento de ruído adaptativo de última geração com áudio espacial e 40h de bateria.",
    fullReview: "O SoundMax Pro X redefine o que esperamos de um headphone premium. Com drivers de 40mm personalizados e cancelamento de ruído adaptativo com 8 microfones, ele entrega uma experiência sonora imersiva que rivaliza com headphones que custam o dobro. O design em couro proteico e alumínio anodizado transmite sofisticação, enquanto o conforto para sessões longas é impecável graças às almofadas de espuma viscoelástica. A conectividade multipoint permite alternar entre dispositivos sem fricção, e o codec LDAC garante áudio em alta resolução via Bluetooth. A bateria de 40 horas é real — testamos em uso contínuo e passou das 38h com ANC ligado. O aplicativo companheiro oferece equalizador paramétrico completo, perfis de som personalizáveis e atualizações OTA.",
    pros: [
      "ANC líder de mercado",
      "Bateria de 40h real",
      "Áudio espacial com head-tracking",
      "Conforto excepcional para uso prolongado",
      "Codec LDAC e aptX Adaptive"
    ],
    cons: [
      "Preço elevado na categoria",
      "Estojo de transporte poderia ser mais compacto",
      "Sem resistência à água"
    ],
    specs: {
      "Driver": "40mm Neodímio",
      "ANC": "Adaptativo 8 microfones",
      "Bateria": "40 horas",
      "Conectividade": "Bluetooth 5.3 Multipoint",
      "Codec": "LDAC, aptX Adaptive, AAC",
      "Peso": "250g"
    },
    affiliateLink: "https://example.com/soundmax-pro-x",
    comparison: {
      competitor: "Sony WH-1000XM5",
      items: [
        { feature: "Cancelamento de Ruído", ours: "8 microfones adaptativos", theirs: "8 microfones" },
        { feature: "Bateria", ours: "40 horas", theirs: "30 horas" },
        { feature: "Áudio Espacial", ours: "Com head-tracking", theirs: "Sem head-tracking" },
        { feature: "Multipoint", ours: "3 dispositivos", theirs: "2 dispositivos" },
        { feature: "Peso", ours: "250g", theirs: "250g" },
      ]
    },
    accessories: [
      { id: "a1", name: "Case Premium em Couro", price: 149, image: "🧳" },
      { id: "a2", name: "Cabo Áudio 3.5mm Banhado a Ouro", price: 79, image: "🔌" },
      { id: "a3", name: "Ear Pads de Reposição", price: 99, image: "🎧" },
    ]
  },
  {
    id: "2",
    title: "AirPulse Elite Buds",
    category: "audio",
    price: 1299,
    rating: 4.6,
    image: productEarbuds,
    shortDesc: "Earbuds TWS com driver planar magnético e ANC híbrido para audiófilos em movimento.",
    fullReview: "Os AirPulse Elite Buds trazem tecnologia de driver planar magnético para o formato TWS, algo que até recentemente era exclusivo de fones over-ear de alta fidelidade. O resultado é uma clareza sonora impressionante, com graves profundos sem distorção e agudos cristalinos. O ANC híbrido com 6 microfones é eficiente no metrô e em escritórios barulhentos, enquanto o modo transparência soa natural. O estojo de carregamento compacto oferece 30h totais de bateria, e o carregamento wireless Qi é um bônus bem-vindo. IPX5 significa que você pode usar sem medo na academia.",
    pros: [
      "Driver planar magnético raro em TWS",
      "Qualidade sonora audiófila",
      "IPX5 para esportes",
      "30h de bateria total",
      "Carregamento wireless"
    ],
    cons: [
      "Fit pode não servir todos os ouvidos",
      "Controles touch pouco precisos",
      "App poderia ter mais recursos"
    ],
    specs: {
      "Driver": "Planar Magnético 14.2mm",
      "ANC": "Híbrido 6 microfones",
      "Bateria": "8h + 22h (estojo)",
      "Conectividade": "Bluetooth 5.3",
      "Resistência": "IPX5",
      "Peso": "5.4g cada"
    },
    affiliateLink: "https://example.com/airpulse-elite",
    comparison: {
      competitor: "AirPods Pro 2",
      items: [
        { feature: "Tipo de Driver", ours: "Planar Magnético", theirs: "Dinâmico" },
        { feature: "ANC", ours: "Híbrido 6 microfones", theirs: "Híbrido adaptativo" },
        { feature: "Bateria (total)", ours: "30 horas", theirs: "30 horas" },
        { feature: "Resistência", ours: "IPX5", theirs: "IPX4" },
        { feature: "Codec", ours: "LDAC, AAC", theirs: "AAC apenas" },
      ]
    },
    accessories: [
      { id: "a4", name: "Pontas de Espuma Memory", price: 59, image: "🔘" },
      { id: "a5", name: "Capa Protetora Silicone", price: 39, image: "🛡️" },
    ]
  },
  {
    id: "3",
    title: "UltraBook Zenith 16",
    category: "computador",
    price: 8499,
    rating: 4.9,
    image: productLaptop,
    shortDesc: "Workstation portátil com tela OLED 4K, chip M3 Pro e design em alumínio reciclado.",
    fullReview: "O UltraBook Zenith 16 é a definição de laptop sem compromissos. A tela OLED 4K de 16 polegadas com cobertura 100% DCI-P3 e brilho de 1000 nits é simplesmente a melhor tela em um laptop que já testamos. Edição de vídeo em 4K, renderização 3D e compilação de código pesado — tudo fluido graças ao chip M3 Pro com 18 núcleos GPU. A memória unificada de 36GB e SSD de 1TB NVMe Gen4 garantem multitasking extremo. O teclado com travel de 1.5mm e trackpad de 15cm são referências de ergonomia. E tudo isso em um chassis de alumínio reciclado de apenas 1.6kg.",
    pros: [
      "Tela OLED 4K espetacular",
      "Performance M3 Pro avassaladora",
      "Apenas 1.6kg",
      "Bateria de 22h para produtividade",
      "6 alto-falantes com Spatial Audio"
    ],
    cons: [
      "Preço premium",
      "Apenas 2 portas USB-C",
      "Sem slot para cartão SD"
    ],
    specs: {
      "Chip": "M3 Pro 12-core CPU / 18-core GPU",
      "Memória": "36GB Unificada",
      "Armazenamento": "1TB SSD NVMe Gen4",
      "Tela": '16" OLED 4K 120Hz',
      "Bateria": "22 horas",
      "Peso": "1.6kg"
    },
    affiliateLink: "https://example.com/ultrabook-zenith",
    comparison: {
      competitor: "MacBook Pro 16 M3 Pro",
      items: [
        { feature: "Tela", ours: "OLED 4K 120Hz", theirs: "Liquid Retina XDR" },
        { feature: "Peso", ours: "1.6kg", theirs: "2.14kg" },
        { feature: "Bateria", ours: "22 horas", theirs: "22 horas" },
        { feature: "Memória", ours: "36GB", theirs: "18GB (base)" },
        { feature: "Alto-falantes", ours: "6 speakers", theirs: "6 speakers" },
      ]
    },
    accessories: [
      { id: "a6", name: "Hub USB-C 7-em-1", price: 299, image: "🔗" },
      { id: "a7", name: "Sleeve Premium em Couro", price: 199, image: "💼" },
      { id: "a8", name: "Stand Ergonômico Alumínio", price: 349, image: "🖥️" },
    ]
  },
  {
    id: "4",
    title: "ChronoFit Ultra Watch",
    category: "wearable",
    price: 2199,
    rating: 4.7,
    image: productSmartwatch,
    shortDesc: "Smartwatch premium com caixa em titânio, GPS dual-band e monitoramento avançado de saúde.",
    fullReview: "O ChronoFit Ultra Watch eleva o padrão de smartwatches com sua construção em titânio Grau 5 e cristal de safira. O GPS dual-band L1+L5 oferece precisão métrica em trilhas e centros urbanos densos. O sensor de saúde de quarta geração monitora SpO2, ECG, temperatura corporal e qualidade do sono com precisão clínica. A tela AMOLED de 1.9 polegadas com always-on display é facilmente legível sob luz solar direta. Com 14 dias de bateria no modo smartwatch e 60h em modo GPS contínuo, é o companheiro perfeito para ultramaratonas e dia a dia.",
    pros: [
      "Construção em titânio Grau 5",
      "GPS dual-band ultra-preciso",
      "14 dias de bateria",
      "Sensores de saúde clínicos",
      "Resistência 10ATM"
    ],
    cons: [
      "Ecossistema de apps limitado",
      "Grande demais para pulsos finos",
      "Carregador proprietário"
    ],
    specs: {
      "Material": "Titânio Grau 5 + Safira",
      "Tela": '1.9" AMOLED 454x454',
      "GPS": "Dual-band L1+L5",
      "Bateria": "14 dias / 60h GPS",
      "Resistência": "10ATM (100m)",
      "Sensores": "SpO2, ECG, Temp, HRM"
    },
    affiliateLink: "https://example.com/chronofit-ultra",
    comparison: {
      competitor: "Apple Watch Ultra 2",
      items: [
        { feature: "Material", ours: "Titânio Grau 5", theirs: "Titânio" },
        { feature: "Bateria", ours: "14 dias", theirs: "36 horas" },
        { feature: "GPS", ours: "Dual-band L1+L5", theirs: "Dual-band L1+L5" },
        { feature: "Resistência", ours: "10ATM", theirs: "10ATM" },
        { feature: "Tela", ours: '1.9" AMOLED', theirs: '1.9" OLED' },
      ]
    },
    accessories: [
      { id: "a9", name: "Pulseira em Titânio", price: 399, image: "⌚" },
      { id: "a10", name: "Pulseira Trail Loop", price: 149, image: "🏃" },
      { id: "a11", name: "Dock de Carregamento", price: 129, image: "🔋" },
    ]
  },
  {
    id: "5",
    title: "VoltStream 25K",
    category: "energia",
    price: 399,
    rating: 4.5,
    image: productPowerbank,
    shortDesc: "Power bank de 25.000mAh com carregamento PD 140W e display OLED integrado.",
    fullReview: "O VoltStream 25K é a solução definitiva para quem vive plugado. Com 25.000mAh de capacidade e saída PD 3.1 de 140W, ele carrega laptops USB-C em velocidade nativa — algo que poucos power banks conseguem. O display OLED integrado mostra voltagem, amperagem, capacidade restante e tempo estimado em cada porta. Três saídas simultâneas (2x USB-C + 1x USB-A) permitem carregar todos os dispositivos de uma vez. O corpo em liga de alumínio CNC dissipa calor com eficiência e sobrevive a quedas. Passou em todos os nossos testes de segurança com certificação UL.",
    pros: [
      "PD 3.1 140W — carrega laptops",
      "Display OLED informativo",
      "Três saídas simultâneas",
      "Corpo em alumínio CNC",
      "Certificação UL de segurança"
    ],
    cons: [
      "Pesado (520g)",
      "Não inclui cabos",
      "Carga completa leva 2h"
    ],
    specs: {
      "Capacidade": "25.000mAh / 90Wh",
      "Saída Máx": "PD 3.1 140W USB-C",
      "Portas": "2x USB-C + 1x USB-A",
      "Display": "OLED 0.96\"",
      "Peso": "520g",
      "Certificação": "UL, FCC, CE"
    },
    affiliateLink: "https://example.com/voltstream-25k",
    comparison: {
      competitor: "Anker 737 Power Bank",
      items: [
        { feature: "Capacidade", ours: "25.000mAh", theirs: "24.000mAh" },
        { feature: "Saída Máx", ours: "140W PD 3.1", theirs: "140W PD 3.1" },
        { feature: "Display", ours: "OLED", theirs: "LED simples" },
        { feature: "Portas", ours: "3 portas", theirs: "3 portas" },
        { feature: "Peso", ours: "520g", theirs: "630g" },
      ]
    },
    accessories: [
      { id: "a12", name: "Cabo USB-C 240W 2m", price: 89, image: "🔌" },
      { id: "a13", name: "Capa de Silicone", price: 49, image: "🛡️" },
    ]
  },
  {
    id: "6",
    title: "BassVault Mini Speaker",
    category: "audio",
    price: 599,
    rating: 4.4,
    image: productSpeaker,
    shortDesc: "Caixa de som portátil com graves profundos, IP67 e 24h de bateria em formato compacto.",
    fullReview: "A BassVault Mini desafia a física. Com apenas 650g e tamanho de uma garrafa d'água, ela entrega graves que você sente no peito graças ao radiador passivo duplo. O IP67 significa que ela sobrevive a submersão em 1m de água por 30 minutos — testamos e confirmamos. As 24 horas de bateria são reais em volume moderado. O modo PartySync conecta até 100 speakers para cobrir áreas enormes. A construção emborrachada com loop de silicone integrado facilita pendurar em qualquer lugar. Para o preço, é imbatível.",
    pros: [
      "Graves impressionantes para o tamanho",
      "IP67 real (testado)",
      "24h de bateria",
      "PartySync até 100 speakers",
      "Construção ultra-resistente"
    ],
    cons: [
      "Sem equalização no app",
      "Agudos poderiam ser mais definidos",
      "Mono — sem estéreo sozinha"
    ],
    specs: {
      "Driver": "52mm + Radiador Passivo Duplo",
      "Potência": "20W RMS",
      "Bateria": "24 horas",
      "Proteção": "IP67",
      "Conectividade": "Bluetooth 5.3",
      "Peso": "650g"
    },
    affiliateLink: "https://example.com/bassvault-mini",
    comparison: {
      competitor: "JBL Flip 6",
      items: [
        { feature: "Bateria", ours: "24 horas", theirs: "12 horas" },
        { feature: "Proteção", ours: "IP67", theirs: "IP67" },
        { feature: "Potência", ours: "20W", theirs: "30W" },
        { feature: "Multi-speaker", ours: "Até 100", theirs: "Até 2 (PartyBoost)" },
        { feature: "Peso", ours: "650g", theirs: "550g" },
      ]
    },
    accessories: [
      { id: "a14", name: "Case de Transporte", price: 69, image: "🧳" },
      { id: "a15", name: "Suporte para Bicicleta", price: 49, image: "🚲" },
    ]
  }
];
