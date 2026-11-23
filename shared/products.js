/*
  Demo catalogue for the Rich Size mock-ups.
  Prices, sizes, colours and model data with real:true come from @richsizekz post captions (Nov 2026);
  they are attached to photos approximately. Items with real:false carry example prices for the mock-up only.
  Photos are temporary stills from @richsizekz; replace with originals before launch.
*/
window.RS_COLORS = {
  black: { ru: 'чёрный', kk: 'қара', hex: '#151414' },
  burgundy: { ru: 'бордовый', kk: 'қою қызыл', hex: '#5B1A24' },
  brown: { ru: 'коричневый', kk: 'қоңыр', hex: '#5A3A28' },
  grey: { ru: 'серый', kk: 'сұр', hex: '#8B8986' },
  white: { ru: 'белый', kk: 'ақ', hex: '#F4F2EE' },
  ivory: { ru: 'айвори', kk: 'ақ-сарғыш', hex: '#E9E1CF' },
  navy: { ru: 'тёмно-синий', kk: 'қою көк', hex: '#1E2740' },
  blue: { ru: 'голубой', kk: 'көгілдір', hex: '#A9C1D9' },
  pink: { ru: 'розовый', kk: 'қызғылт', hex: '#E7B9BF' },
  olive: { ru: 'оливковый', kk: 'жасыл', hex: '#5E5F37' },
  emerald: { ru: 'изумрудный', kk: 'зүмірет', hex: '#0F4D3A' },
  plum: { ru: 'сливовый', kk: 'алхоры', hex: '#4A2234' },
  silver: { ru: 'серебристый', kk: 'күміс түсті', hex: '#BFC2C4' },
  red: { ru: 'красный', kk: 'қызыл', hex: '#B3122A' },
  sage: { ru: 'шалфей', kk: 'шалфей', hex: '#9CA58A' }
};

window.RS_CATEGORIES = [
  { id: 'dresses', ru: 'Платья', kk: 'Көйлектер' },
  { id: 'evening', ru: 'Вечерние', kk: 'Кешкі киім' },
  { id: 'suits', ru: 'Костюмы', kk: 'Костюмдер' },
  { id: 'jackets', ru: 'Жакеты', kk: 'Жакеттер' },
  { id: 'bottoms', ru: 'Юбки и брюки', kk: 'Белдемше мен шалбар' },
  { id: 'outer', ru: 'Верхняя одежда', kk: 'Сырт киім' }
];

const ALL = [50, 52, 54, 56, 58, 60];
const M165 = { height: 165, size: '56–58' };
const M175 = { height: 175, size: '52' };
// The 165 cm model wears 56 on top and 58 on the bottom (caption of 22 Nov 2026).
const M165TOP = { height: 165, size: '56' };
const M165BOT = { height: 165, size: '58' };

window.RS_PRODUCTS = [
  { id: 'suit-peplum', cat: 'suits', ru: 'Костюм-двойка с баской', kk: 'Баскалы екілік костюм', price: 26950, sizes: [48, 50, 52, 54], colors: ['emerald', 'brown', 'grey'], model: M175, photos: ['emerald-suit'], badge: 'new', real: true },
  { id: 'jacket-classic', cat: 'jackets', ru: 'Классический жакет', kk: 'Классикалық жакет', price: 24950, sizes: ALL, colors: ['black', 'burgundy', 'blue', 'pink'], model: M165TOP, photos: ['black-blazer'], badge: 'new', real: true },
  { id: 'jacket-leather', cat: 'jackets', ru: 'Жакет из экокожи', kk: 'Эко-былғары жакет', price: 23950, sizes: [50, 52, 54, 56], colors: ['burgundy', 'black'], model: M165TOP, photos: ['burgundy-leather-jacket', 'burgundy-leather-full', 'leather-duo'], badge: 'new', real: true },
  { id: 'coat-straight', cat: 'outer', ru: 'Пальто прямого кроя', kk: 'Тік пішімді пальто', price: 45950, sizes: [52, 54, 56, 58], colors: ['brown', 'grey', 'black'], model: M165, photos: ['brown-coat', 'street-brown'], badge: 'new', real: true },
  { id: 'trousers-wide', cat: 'bottoms', ru: 'Широкие брюки', kk: 'Кең шалбар', price: 14950, sizes: ALL, colors: ['white', 'black', 'brown', 'navy'], model: M165BOT, photos: ['white-suit'], real: true },
  { id: 'skirt-pleated', cat: 'bottoms', ru: 'Юбка плиссе', kk: 'Плиссе белдемше', price: 16950, sizes: ALL, colors: ['burgundy', 'black', 'brown'], model: M165BOT, photos: ['plum-vest-pleated'], real: true },
  { id: 'skirt-leather', cat: 'bottoms', ru: 'Юбка-миди из экокожи', kk: 'Эко-былғары миди белдемше', price: 13950, sizes: [50, 52, 54], colors: ['brown', 'black'], model: M175, photos: ['grey-knit-leather-skirt'], real: true },
  { id: 'jacket-suit', cat: 'jackets', ru: 'Костюмный жакет', kk: 'Костюм жакеті', price: 23950, sizes: ALL, colors: ['blue', 'black'], model: M165TOP, photos: ['blue-blazer-sequin'], real: true },
  { id: 'zip-cardigan', cat: 'outer', ru: 'Кофта на молнии', kk: 'Сыдырмалы кофта', price: 19950, sizes: [50, 52, 54, 56], colors: ['ivory'], model: M165TOP, photos: ['cream-jacket-casual'], real: true },
  { id: 'dress-velvet-pearl', cat: 'evening', ru: 'Бархатное платье с жемчугом', kk: 'Інжулі барқыт көйлек', price: 32950, sizes: ALL, colors: ['burgundy', 'black'], model: M165, photos: ['wine-velvet-dress'], badge: 'new', real: false },
  { id: 'dress-mermaid', cat: 'evening', ru: 'Платье-русалка с открытыми плечами', kk: 'Иығы ашық су перісі көйлек', price: 38950, sizes: ALL, colors: ['burgundy'], model: M165, photos: ['burgundy-offshoulder-gown'], real: false },
  { id: 'dress-lurex', cat: 'evening', ru: 'Платье макси с люрексом', kk: 'Люрексті ұзын көйлек', price: 34950, sizes: [50, 52, 54, 56, 58], colors: ['grey'], model: M165, photos: ['grey-lurex-gown'], real: false },
  { id: 'dress-fringe-navy', cat: 'evening', ru: 'Платье с бахромой', kk: 'Шашақты көйлек', price: 36950, sizes: ALL, colors: ['navy', 'black'], model: M165, photos: ['navy-fringe-gown', 'black-velvet-fringe-pair'], real: false },
  { id: 'dress-sequin', cat: 'evening', ru: 'Платье в пайетках', kk: 'Пайеткалы көйлек', price: 34950, sizes: [52, 54, 56, 58], colors: ['plum'], model: M165, photos: ['plum-sequin-dress'], real: false },
  { id: 'dress-satin-ruffle', cat: 'evening', ru: 'Атласное платье с воланом', kk: 'Волан атлас көйлек', price: 31950, sizes: ALL, colors: ['black'], model: M165, photos: ['black-satin-ruffle'], real: false },
  { id: 'dress-lace', cat: 'evening', ru: 'Кружевное платье', kk: 'Шілтер көйлек', price: 39950, sizes: [50, 52, 54, 56], colors: ['black'], model: M175, photos: ['black-lace-gown'], real: false },
  { id: 'dress-velvet-fringe', cat: 'dresses', ru: 'Бархатное платье с бахромой', kk: 'Шашақты барқыт көйлек', price: 29950, sizes: ALL, colors: ['burgundy'], model: M165, photos: ['wine-fringe-dress'], real: false },
  { id: 'dress-belted', cat: 'dresses', ru: 'Платье с поясом', kk: 'Белбеулі көйлек', price: 21950, sizes: [50, 52, 54, 56, 58], colors: ['black'], model: M165, photos: ['black-belted-mini'], real: false },
  { id: 'blouse-red', cat: 'dresses', ru: 'Блуза с объёмным рукавом', kk: 'Көлемді жеңді блуза', price: 17950, sizes: ALL, colors: ['red', 'black'], model: M165, photos: ['red-blouse'], badge: 'sale', oldPrice: 23950, real: false },
  { id: 'skirt-satin', cat: 'bottoms', ru: 'Атласная юбка', kk: 'Атлас белдемше', price: 16950, sizes: ALL, colors: ['sage', 'black'], model: M165BOT, photos: ['sage-satin-skirt'], real: false },
  { id: 'set-sequin', cat: 'suits', ru: 'Костюм с пайетками', kk: 'Пайеткалы костюм', price: 36950, sizes: [50, 52, 54, 56], colors: ['black'], model: M165, photos: ['black-sequin-set'], real: false },
  { id: 'set-vest-sequin', cat: 'suits', ru: 'Жилет и юбка в пайетках', kk: 'Пайеткалы кеудеше мен белдемше', price: 33950, sizes: [50, 52, 54, 56], colors: ['white', 'silver'], model: M165, photos: ['white-vest-sequin-skirt'], real: false }
];

window.RS_STORES = [
  // Hours confirmed by the @richsizekz captions only for the Almaty stores (10:00–22:00, Moskva 09:00–22:00).
  { city: { ru: 'Алматы', kk: 'Алматы' }, place: 'ЖК «Art Residence»', addr: 'ул. Бекхожина, 15а', hours: '10:00–22:00', confirmed: true },
  { city: { ru: 'Алматы', kk: 'Алматы' }, place: 'ТРЦ Moskva Metropolitan', addr: '8-й мкр, 37/1, 2 этаж', hours: '09:00–22:00', confirmed: true },
  { city: { ru: 'Алматы', kk: 'Алматы' }, place: 'ТРЦ Mega', addr: 'ул. Розыбакиева, 247а, 1 этаж', hours: '10:00–22:00', confirmed: true },
  { city: { ru: 'Астана', kk: 'Астана' }, place: 'Rich Size Астана', addr: 'ул. Бокейхана, 24', hours: null },
  { city: { ru: 'Шымкент', kk: 'Шымкент' }, place: 'Rich Size Шымкент', addr: 'ул. Жангельдина, 8', hours: null },
  { city: { ru: 'Атырау', kk: 'Атырау' }, place: 'Rich Size Атырау', addr: 'ул. Тайманова, 48', hours: null },
  { city: { ru: 'Актау', kk: 'Ақтау' }, place: 'ЖК «Premium Plaza»', addr: '18А мкр', hours: null }
];

window.RS_WHATSAPP = '77475143985';
