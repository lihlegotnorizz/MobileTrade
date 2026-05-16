// ============= CONFIGURATION =============
const API_BASE_URL = 'http://localhost:5000/api';
const ADMIN_CREDENTIALS = {
    email: 'admin@mobiletrade.co.za',
    password: 'Admin@123'
};

const translations = {
    en: {
        brand: 'MobileTrade',
        navHome: 'Home',
        navMarketplace: 'Marketplace',
        navTradeIn: 'Trade-In',
        navService: 'Service',
        navLogin: 'Login',
        navRegister: 'Register',
        adminLogin: 'Admin',
        heroEyebrow: 'Trusted South African phone trade',
        heroTitle: 'Buy, sell and trade phones in a premium, simple white experience.',
        heroSubtitle: 'A clean marketplace built for local buyers and sellers, with secure customer service and built-in risk controls.',
        heroPanelLabel: 'Featured',
        heroPanelHeading: 'A premium selection of tested phones.',
        heroPanelText: 'Every listing is presented with clarity, strong imagery, and trust built into the customer journey.',
        heroPillar1: 'Studio-level curation',
        heroPillar2: 'Local service desk',
        heroPillar3: 'Clear pricing',
        sellButton: 'Sell Your Phone',
        tradeButton: 'Trade-In Now',
        marketplaceEyebrow: 'Featured phones',
        marketplaceTitle: 'Available phone listings',
        searchPlaceholder: 'Search phones, models or brands...',
        allBrands: 'All Brands',
        loadingListings: 'Loading listings...',
        calculatorEyebrow: 'Get an instant estimate',
        calculatorTitle: 'Trade-In calculator',
        currentBrandLabel: 'Current Phone Brand',
        selectBrand: 'Select Brand',
        modelLabel: 'Model',
        modelPlaceholder: 'e.g., iPhone 12',
        conditionLabel: 'Condition',
        desiredPhoneLabel: 'Desired New Phone',
        selectPhone: 'Select Phone',
        calculateButton: 'Calculate Trade Value',
        phoneValueLabel: 'Your phone\'s value:',
        newPhonePriceLabel: 'New phone price:',
        topupLabel: 'Top-up amount needed:',
        serviceEyebrow: 'Secure support',
        serviceTitle: 'Customer service and risk mitigation',
        serviceSubtitle: 'Admin tools to validate KYC, block suspicious activity, and keep every trade safe.',
        supportCard1Title: 'Fast local support',
        supportCard1Text: 'Chat with buyers and sellers, manage returns, and resolve disputes cleanly.',
        supportCard2Title: 'Verified sellers',
        supportCard2Text: 'KYC checks and seller ratings keep the marketplace trusted and transparent.',
        supportCard3Title: 'Risk controls',
        supportCard3Text: 'Flag suspicious listings and accounts before they impact buyers or the brand.',
        adminPanelEyebrow: 'Admin workspace',
        adminPanelTitle: 'Admin Service Desk',
        adminPanelSubtitle: 'Review user verification, blocked accounts, support tickets, and risk alerts.',
        pendingKyc: 'Pending KYC',
        fraudAlerts: 'Fraud Alerts',
        supportTickets: 'Open Support Tickets',
        blockedAccounts: 'Blocked Accounts',
        listPhoneTitle: 'List Your Phone',
        brandLabel: 'Phone Brand',
        priceLabel: 'Price (R)',
        storageLabel: 'Storage Capacity',
        descriptionLabel: 'Description',
        photosLabel: 'Upload Photos',
        listPhoneButton: 'List Phone',
        loginTitle: 'Login to MobileTrade',
        emailLabel: 'Email',
        passwordLabel: 'Password',
        loginButton: 'Login',
        registerPrompt: 'Don\'t have an account? <a href="#register">Register here</a>',
        registerTitle: 'Register with MobileTrade',
        fullNameLabel: 'Full Name',
        phoneLabel: 'Phone Number',
        idNumberLabel: 'ID Number (for KYC)',
        uploadIdLabel: 'Upload ID Document',
        registerButton: 'Register',
        adminTitle: 'Admin Login',
        adminSubtitle: 'Access customer service and risk mitigation controls.',
        adminLoginButton: 'Admin Login',
        proceedButton: 'Proceed to Payment',
        excellent: 'Excellent',
        good: 'Good',
        fair: 'Fair'
    },
    af: {
        brand: 'MobileTrade',
        navHome: 'Tuis',
        navMarketplace: 'Markplek',
        navTradeIn: 'Ruil in',
        navService: 'Diens',
        navLogin: 'Teken in',
        navRegister: 'Registreer',
        adminLogin: 'Admin',
        heroEyebrow: 'Betroubare Suid-Afrikaanse telefoonhandel',
        heroTitle: 'Koop, verkoop en ruil telefone in ’n duidelike wit ervaring.',
        heroSubtitle: '’n Skoner markplek vir plaaslike kopers en verkopers met veilige kliëntediens en risiko beheer.',
        heroPanelLabel: 'Uitgelig',
        heroPanelHeading: '’n premium keuse van getoetste telefone.',
        heroPanelText: 'Elke lysing word aangebied met duidelikheid, sterk beeldmateriaal en vertroue in die kliëntreis.',
        heroPillar1: 'Studio-skikking',
        heroPillar2: 'Plaaslike dienslessenaar',
        heroPillar3: 'Duidelike prysbepaling',
        sellButton: 'Verkoop jou telefoon',
        tradeButton: 'Ruil in nou',
        marketplaceEyebrow: 'Bekende telefone',
        marketplaceTitle: 'Beskikbare telefoonlyste',
        searchPlaceholder: 'Soek telefone, modelle of handelsmerke...',
        allBrands: 'Alle handelsmerke',
        loadingListings: 'Lyste word gelaai...',
        calculatorEyebrow: 'Kry ’n onmiddellike skatting',
        calculatorTitle: 'Ruil-in sakrekenaar',
        currentBrandLabel: 'Huidige telefoonhandelsmerk',
        selectBrand: 'Kies handelsmerk',
        modelLabel: 'Model',
        modelPlaceholder: 'bv. iPhone 12',
        conditionLabel: 'Toestand',
        desiredPhoneLabel: 'Gewenste nuwe telefoon',
        selectPhone: 'Kies telefoon',
        calculateButton: 'Berei ruilwaarde voor',
        phoneValueLabel: 'Jou telefoon se waarde:',
        newPhonePriceLabel: 'Nuwe telefoon se prys:',
        topupLabel: 'Top-up bedrag benodig:',
        serviceEyebrow: 'Veilige ondersteuning',
        serviceTitle: 'Kliëntediens en risikobeheer',
        serviceSubtitle: 'Admin-hulpmiddels om KYC te valideer, verdagte aktiwiteit te blokkeer en elke transaksie veilig te hou.',
        supportCard1Title: 'Vinnige plaaslike ondersteuning',
        supportCard1Text: 'Gesels met kopers en verkopers, bestuur terugsendings en los geskille op.',
        supportCard2Title: 'Geverifieerde verkopers',
        supportCard2Text: 'KYC-toetse en verkopergraderings hou die mark vertroulik en deursigtig.',
        supportCard3Title: 'Risikokontroles',
        supportCard3Text: 'Merk verdagte advertensies en rekeninge voordat dit kopers raak.',
        adminPanelEyebrow: 'Admin-werksruimte',
        adminPanelTitle: 'Admin-dienslessenaar',
        adminPanelSubtitle: 'Hersien gebruiker-verifikasie, geblokkeerde rekeninge, ondersteuningstake en risiko-waarskuwings.',
        pendingKyc: 'Hangende KYC',
        fraudAlerts: 'Bedrogwaarskuwings',
        supportTickets: 'Oop ondersteuningskaartjies',
        blockedAccounts: 'Geblokkeerde rekeninge',
        listPhoneTitle: 'Lys jou telefoon',
        brandLabel: 'Telefoonhandelsmerk',
        priceLabel: 'Prys (R)',
        storageLabel: 'Stoor kapasiteit',
        descriptionLabel: 'Beskrywing',
        photosLabel: 'Laai foto’s op',
        listPhoneButton: 'Lys telefoon',
        loginTitle: 'Teken in by MobileTrade',
        emailLabel: 'E-pos',
        passwordLabel: 'Wagwoord',
        loginButton: 'Teken in',
        registerPrompt: 'Het jy nog nie ’n rekening nie? <a href="#register">Registreer hier</a>',
        registerTitle: 'Registreer by MobileTrade',
        fullNameLabel: 'Volle naam',
        phoneLabel: 'Telefoonnommer',
        idNumberLabel: 'ID-nommer (vir KYC)',
        uploadIdLabel: 'Laai ID-dokument op',
        registerButton: 'Registreer',
        adminTitle: 'Admin-aanmelding',
        adminSubtitle: 'Toegang tot kliëntediens- en risiko-beheer.',
        adminLoginButton: 'Admin teken in',
        proceedButton: 'Gaan na betaling',
        excellent: 'Uitstekend',
        good: 'Goed',
        fair: 'Regverdig'
    },
    xh: {
        brand: 'MobileTrade',
        navHome: 'Ikhaya',
        navMarketplace: 'Imarike',
        navTradeIn: 'Guqula',
        navService: 'Inkonzo',
        navLogin: 'Ngena',
        navRegister: 'Bhalisa',
        adminLogin: 'Admin',
        heroEyebrow: 'Uthengiso lwetelefoni oluthembekileyo eMzantsi Afrika',
        heroTitle: 'Thenga, thengisa kwaye uguqule iifowuni kwindawo elula emhlophe.',
        heroSubtitle: 'Iimarike ezicocweyo zabathengi basekuhlaleni, nenkonzo yabathengi ekhuselekileyo kunye nolawulo lomngcipheko.',
        heroPanelLabel: 'Eqaqambileyo',
        heroPanelHeading: 'Ukukhethwa okuphambili kweefowuni ezivavanyiweyo.',
        heroPanelText: 'Yonke intengiso iboniswa ngokucacileyo, ngemifanekiso enomtsalane, kunye nokhuseleko kwindlela yomthengi.',
        heroPillar1: 'Uqwalaselo lwe-studio',
        heroPillar2: 'Ideski yenkonzo yendawo',
        heroPillar3: 'Ixabiso elicacileyo',
        sellButton: 'Thengisa ifowuni yakho',
        tradeButton: 'Guqula ngoku',
        marketplaceEyebrow: 'Iifowuni eziphambili',
        marketplaceTitle: 'Uluhlu lweefowuni ezikhoyo',
        searchPlaceholder: 'Khangela iifowuni, iimodeli okanye iibranti...',
        allBrands: 'Zonke iiBranti',
        loadingListings: 'Kulayishwa uluhlu...',
        calculatorEyebrow: 'Fumana ixabiso kwangoko',
        calculatorTitle: 'Isibali-mali seTrade-In',
        currentBrandLabel: 'Brand yefowuni yangoku',
        selectBrand: 'Khetha brand',
        modelLabel: 'Imodeli',
        modelPlaceholder: 'umz. iPhone 12',
        conditionLabel: 'Imeko',
        desiredPhoneLabel: 'Ifowuni entsha oyifunayo',
        selectPhone: 'Khetha ifowuni',
        calculateButton: 'Bala ixabiso',
        phoneValueLabel: 'Ixabiso lefowuni yakho:',
        newPhonePriceLabel: 'Ixabiso lefowuni entsha:',
        topupLabel: 'Amaxabiso owadingayo:',
        serviceEyebrow: 'Inkxaso ekhuselekileyo',
        serviceTitle: 'Inkonzo yabathengi kunye nolawulo lomngcipheko',
        serviceSubtitle: 'Izixhobo ze-admin zokuqinisekisa i-KYC, ukuvimba imisebenzi enokugula, nokugcina urhwebu olukhe phantsi.',
        supportCard1Title: 'Inkxaso yendawo ekhawulezayo',
        supportCard1Text: 'Nxibelelana nabathengi kunye nabanini, ulawule ukubuyiswa, kwaye usombulule iingxabano ngokucacileyo.',
        supportCard2Title: 'Abathengisi abaqinisekisiweyo',
        supportCard2Text: 'Uvavanyo lwe-KYC kunye noluhlu lwezilinganiso zigcina imarike ithembekile.',
        supportCard3Title: 'Ulawulo lomngcipheko',
        supportCard3Text: 'Beka uphawu kwii-listing ezisolisayo kunye neakhawunti ngaphambi kokuba zithintele abathengi.',
        adminPanelEyebrow: 'Indawo yokusebenza yeAdmin',
        adminPanelTitle: 'Ideski yonxibelelwano yeAdmin',
        adminPanelSubtitle: 'Jonga ukuqinisekiswa komsebenzisi, iiakhawunti ezivinjwa, izicelo zoncedo, kunye nezilumkiso zomngcipheko.',
        pendingKyc: 'I-KYC elindelekileyo',
        fraudAlerts: 'Iisilumkiso zokukhohlisa',
        supportTickets: 'Amatikiti oncedo avaliwe',
        blockedAccounts: 'Amaakho akhubekileyo',
        listPhoneTitle: 'Bhalisa ifowuni yakho',
        brandLabel: 'Brand yefowuni',
        priceLabel: 'Ixabiso (R)',
        storageLabel: 'Umthamo wendawo',
        descriptionLabel: 'Inkcazo',
        photosLabel: 'Layisha iifoto',
        listPhoneButton: 'Bhalisa ifowuni',
        loginTitle: 'Ngena kwi-MobileTrade',
        emailLabel: 'I-imeyile',
        passwordLabel: 'Iphasiwedi',
        loginButton: 'Ngena',
        registerPrompt: 'Awunayo iakhawunti? <a href="#register">Bhalisa apha</a>',
        registerTitle: 'Bhalisa kwi-MobileTrade',
        fullNameLabel: 'Igama elipheleleyo',
        phoneLabel: 'Inombolo yefowuni',
        idNumberLabel: 'Inombolo ye-ID (yeKYC)',
        uploadIdLabel: 'Layisha uxwebhu lwe-ID',
        registerButton: 'Bhalisa',
        adminTitle: 'Ngena njengo-Admin',
        adminSubtitle: 'Fikelela kwizixhobo zenkonzo yabathengi kunye nolawulo lomngcipheko.',
        adminLoginButton: 'Ngena njenge-Admin',
        proceedButton: 'Qhubeka uye kwiNtlawulo',
        excellent: 'Egqwesileyo',
        good: 'Okuhle',
        fair: 'Okuqhelekileyo'
    },
    es: {
        brand: 'MobileTrade',
        navHome: 'Inicio',
        navMarketplace: 'Mercado',
        navTradeIn: 'Cambio',
        navService: 'Servicio',
        navLogin: 'Iniciar sesión',
        navRegister: 'Registrarse',
        adminLogin: 'Admin',
        heroEyebrow: 'Comercio de teléfonos de confianza en Sudáfrica',
        heroTitle: 'Compra, vende y cambia teléfonos en una experiencia blanca y elegante.',
        heroSubtitle: 'Un mercado moderno para compradores y vendedores locales con servicio seguro y control de riesgos integrado.',
        heroPanelLabel: 'Destacado',
        heroPanelHeading: 'Una selección premium de teléfonos verificados.',
        heroPanelText: 'Cada anuncio se muestra con claridad, imágenes de calidad y confianza en cada paso.',
        heroPillar1: 'Curación de estilo estudio',
        heroPillar2: 'Atención local',
        heroPillar3: 'Precios transparentes',
        sellButton: 'Vende tu teléfono',
        tradeButton: 'Cambia ahora',
        marketplaceEyebrow: 'Teléfonos destacados',
        marketplaceTitle: 'Listados disponibles',
        searchPlaceholder: 'Busca teléfonos, modelos o marcas...',
        allBrands: 'Todas las marcas',
        loadingListings: 'Cargando listados...',
        calculatorEyebrow: 'Obtén una estimación instantánea',
        calculatorTitle: 'Calculadora Trade-In',
        currentBrandLabel: 'Marca actual del teléfono',
        selectBrand: 'Selecciona marca',
        modelLabel: 'Modelo',
        modelPlaceholder: 'p.ej., iPhone 12',
        conditionLabel: 'Condición',
        desiredPhoneLabel: 'Nuevo teléfono deseado',
        selectPhone: 'Selecciona teléfono',
        calculateButton: 'Calcular valor',
        phoneValueLabel: 'Valor de tu teléfono:',
        newPhonePriceLabel: 'Precio del nuevo teléfono:',
        topupLabel: 'Monto necesario:',
        serviceEyebrow: 'Soporte seguro',
        serviceTitle: 'Atención al cliente y mitigación de riesgos',
        serviceSubtitle: 'Herramientas administrativas para validar KYC, bloquear actividad sospechosa y asegurar cada intercambio.',
        supportCard1Title: 'Soporte local rápido',
        supportCard1Text: 'Chatea con compradores y vendedores, gestiona devoluciones y resuelve disputas con elegancia.',
        supportCard2Title: 'Vendedores verificados',
        supportCard2Text: 'Verificaciones KYC y calificaciones mantendrán el mercado confiable y transparente.',
        supportCard3Title: 'Controles de riesgo',
        supportCard3Text: 'Marca anuncios sospechosos y cuentas antes de que impacten a los compradores.',
        adminPanelEyebrow: 'Espacio de administración',
        adminPanelTitle: 'Mesa de servicio administrativa',
        adminPanelSubtitle: 'Revisa verificación de usuarios, cuentas bloqueadas, tickets de soporte y alertas de riesgo.',
        pendingKyc: 'KYC pendiente',
        fraudAlerts: 'Alertas de fraude',
        supportTickets: 'Tickets de soporte abiertos',
        blockedAccounts: 'Cuentas bloqueadas',
        listPhoneTitle: 'Lista tu teléfono',
        brandLabel: 'Marca del teléfono',
        priceLabel: 'Precio (R)',
        storageLabel: 'Capacidad de almacenamiento',
        descriptionLabel: 'Descripción',
        photosLabel: 'Sube fotos',
        listPhoneButton: 'Listar teléfono',
        loginTitle: 'Inicia sesión en MobileTrade',
        emailLabel: 'Correo electrónico',
        passwordLabel: 'Contraseña',
        loginButton: 'Iniciar sesión',
        registerPrompt: '¿No tienes cuenta? <a href="#register">Regístrate aquí</a>',
        registerTitle: 'Regístrate en MobileTrade',
        fullNameLabel: 'Nombre completo',
        phoneLabel: 'Número de teléfono',
        idNumberLabel: 'Número de identificación (para KYC)',
        uploadIdLabel: 'Sube documento de identificación',
        registerButton: 'Regístrate',
        adminTitle: 'Inicio de sesión de administrador',
        adminSubtitle: 'Accede a herramientas de servicio al cliente y mitigación de riesgos.',
        adminLoginButton: 'Ingresar como administrador',
        proceedButton: 'Proceder al pago',
        excellent: 'Excelente',
        good: 'Bueno',
        fair: 'Regular'
    },
    fr: {
        brand: 'MobileTrade',
        navHome: 'Accueil',
        navMarketplace: 'Marché',
        navTradeIn: 'Échange',
        navService: 'Service',
        navLogin: 'Connexion',
        navRegister: 'Inscription',
        adminLogin: 'Admin',
        heroEyebrow: 'Commerce de téléphones fiable en Afrique du Sud',
        heroTitle: 'Achetez, vendez et échangez des téléphones dans une expérience blanche et élégante.',
        heroSubtitle: 'Un marché moderne pour acheteurs et vendeurs locaux, avec un service sécurisé et un contrôle des risques intégré.',
        heroPanelLabel: 'En vedette',
        heroPanelHeading: 'Une sélection premium de téléphones testés.',
        heroPanelText: 'Chaque annonce est présentée avec clarté, des images soignées et une confiance intégrée.',
        heroPillar1: 'Curation studio',
        heroPillar2: 'Service client local',
        heroPillar3: 'Tarification claire',
        sellButton: 'Vendez votre téléphone',
        tradeButton: 'Échangez maintenant',
        marketplaceEyebrow: 'Téléphones en vedette',
        marketplaceTitle: 'Annonces disponibles',
        searchPlaceholder: 'Recherchez des téléphones, modèles ou marques...',
        allBrands: 'Toutes les marques',
        loadingListings: 'Chargement des annonces...',
        calculatorEyebrow: 'Obtenez une estimation instantanée',
        calculatorTitle: 'Calculateur Trade-In',
        currentBrandLabel: 'Marque du téléphone actuel',
        selectBrand: 'Sélectionnez une marque',
        modelLabel: 'Modèle',
        modelPlaceholder: 'ex. iPhone 12',
        conditionLabel: 'État',
        desiredPhoneLabel: 'Nouveau téléphone souhaité',
        selectPhone: 'Sélectionnez un téléphone',
        calculateButton: 'Calculer la valeur',
        phoneValueLabel: 'La valeur de votre téléphone :',
        newPhonePriceLabel: 'Prix du nouveau téléphone :',
        topupLabel: 'Montant à rajouter :',
        serviceEyebrow: 'Support sécurisé',
        serviceTitle: 'Service client et atténuation des risques',
        serviceSubtitle: 'Outils d’administration pour valider le KYC, bloquer l’activité suspecte et sécuriser chaque transaction.',
        supportCard1Title: 'Support local rapide',
        supportCard1Text: 'Discutez avec acheteurs et vendeurs, gérez les retours et résolvez les litiges avec clarté.',
        supportCard2Title: 'Vendeurs vérifiés',
        supportCard2Text: 'Les contrôles KYC et les évaluations gardent le marché fiable et transparent.',
        supportCard3Title: 'Contrôles de risque',
        supportCard3Text: 'Signalez les annonces et comptes suspects avant qu’ils n’impactent les acheteurs.',
        adminPanelEyebrow: 'Espace admin',
        adminPanelTitle: 'Tableau de service admin',
        adminPanelSubtitle: 'Examinez les vérifications des utilisateurs, comptes bloqués, tickets de support et alertes de risque.',
        pendingKyc: 'KYC en attente',
        fraudAlerts: 'Alertes de fraude',
        supportTickets: 'Tickets de support ouverts',
        blockedAccounts: 'Comptes bloqués',
        listPhoneTitle: 'Répertoriez votre téléphone',
        brandLabel: 'Marque de téléphone',
        priceLabel: 'Prix (R)',
        storageLabel: 'Capacité de stockage',
        descriptionLabel: 'Description',
        photosLabel: 'Téléchargez des photos',
        listPhoneButton: 'Répertorier le téléphone',
        loginTitle: 'Connexion à MobileTrade',
        emailLabel: 'Email',
        passwordLabel: 'Mot de passe',
        loginButton: 'Connexion',
        registerPrompt: 'Vous n’avez pas de compte ? <a href="#register">Inscrivez-vous ici</a>',
        registerTitle: 'Inscrivez-vous à MobileTrade',
        fullNameLabel: 'Nom complet',
        phoneLabel: 'Numéro de téléphone',
        idNumberLabel: 'Numéro d’identification (pour KYC)',
        uploadIdLabel: 'Téléchargez le document d’identité',
        registerButton: 'Inscrivez-vous',
        adminTitle: 'Connexion admin',
        adminSubtitle: 'Accédez aux outils de service client et de gestion des risques.',
        adminLoginButton: 'Connexion admin',
        proceedButton: 'Aller au paiement',
        excellent: 'Excellent',
        good: 'Bon',
        fair: 'Moyen'
    }
};

const mockPhones = [
    {
        id: 1,
        brand: 'iPhone',
        model: 'iPhone 14 Pro',
        price: 18999,
        condition: 'excellent',
        storage: '256GB',
        seller: 'iStore Partner',
        rating: 4.9,
        image: 'img/Iphone 14 Pro Max Deep Purple.jpeg',
        imageAlt: 'iPhone 14 Pro Max Deep Purple',
        description: 'Excellent condition, near-new, warranty available',
        location: 'Cape Town'
    },
    {
        id: 2,
        brand: 'Samsung',
        model: 'Galaxy S23 Ultra',
        price: 16799,
        condition: 'good',
        storage: '256GB',
        seller: 'Johannesburg Tech',
        rating: 4.7,
        image: 'img/samsung-s23-ultra.jpeg',
        imageAlt: 'Samsung Galaxy S23 Ultra',
        description: 'Clean condition, original charger included',
        location: 'Johannesburg'
    },
    {
        id: 3,
        brand: 'Xiaomi',
        model: 'Redmi Note 12',
        price: 5999,
        condition: 'good',
        storage: '128GB',
        seller: 'Durban Deals',
        rating: 4.4,
        image: 'img/redmi-note-12.jpeg',
        imageAlt: 'Xiaomi Redmi Note 12',
        description: 'Good value with strong battery life',
        location: 'Durban'
    },
    {
        id: 4,
        brand: 'OnePlus',
        model: 'OnePlus 11',
        price: 12399,
        condition: 'excellent',
        storage: '256GB',
        seller: 'Cape Town Mobile',
        rating: 4.8,
        image: 'img/oneplus-45951.jpeg',
        imageAlt: 'OnePlus 11',
        description: 'Premium condition, local delivery available',
        location: 'Cape Town'
    }
];

const tradeValues = {
    iPhone: { 'iPhone 14 Pro': 15500, 'iPhone 13 Pro': 12500, 'iPhone 12': 9500 },
    Samsung: { 'Galaxy S23 Ultra': 14500, 'Galaxy S22': 10500, 'Galaxy A54': 6500 },
    Xiaomi: { 'Redmi Note 12': 5200, 'Mi 11': 4900, 'Redmi Note 10': 3500 },
    OnePlus: { 'OnePlus 11': 11000, 'OnePlus 10': 9500 }
};

// ============= DOM ELEMENTS =============
const sellBtn = document.getElementById('sellBtn');
const tradeBtn = document.getElementById('tradeBtn');
const phoneListings = document.getElementById('phoneListings');
const searchInput = document.getElementById('searchInput');
const brandFilter = document.getElementById('brandFilter');
const calculateBtn = document.getElementById('calculateBtn');
const newPhoneSelect = document.getElementById('newPhone');
const languageSelect = document.getElementById('languageSelect');
const loginLink = document.getElementById('loginLink');
const registerLink = document.getElementById('registerLink');
const adminLink = document.getElementById('adminLink');
const adminPanel = document.getElementById('adminPanel');

const sellModal = document.getElementById('sellModal');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const adminLoginModal = document.getElementById('adminLoginModal');
const phoneModal = document.getElementById('phoneModal');

const sellForm = document.getElementById('sellForm');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const adminLoginForm = document.getElementById('adminLoginForm');

const pendingKycCount = document.getElementById('pendingKycCount');
const fraudAlertsCount = document.getElementById('fraudAlertsCount');
const supportTicketsCount = document.getElementById('supportTicketsCount');
const blockedAccountsCount = document.getElementById('blockedAccountsCount');

let currentLang = localStorage.getItem('mobileTradeLang') || 'en';

// ============= MODALS =============
function initializeModals() {
    document.querySelectorAll('.modal .close').forEach(btn => {
        btn.addEventListener('click', () => btn.closest('.modal').classList.remove('active'));
    });

    window.addEventListener('click', event => {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('active');
        }
    });
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

// ============= EVENT LISTENERS =============
function setupEventListeners() {
    loginLink.addEventListener('click', e => {
        e.preventDefault();
        if (localStorage.getItem('isLoggedIn') === 'true') {
            logoutUser();
            return;
        }
        openModal('loginModal');
    });

    registerLink.addEventListener('click', e => {
        e.preventDefault();
        openModal('registerModal');
    });

    adminLink.addEventListener('click', e => {
        e.preventDefault();
        openModal('adminLoginModal');
    });

    sellBtn.addEventListener('click', () => openModal('sellModal'));
    tradeBtn.addEventListener('click', () => {
        document.querySelector('a[href="#tradein"]').click();
        window.scrollTo({ top: document.getElementById('tradein').offsetTop, behavior: 'smooth' });
    });

    searchInput.addEventListener('input', loadPhoneListings);
    brandFilter.addEventListener('change', loadPhoneListings);

    calculateBtn.addEventListener('click', calculateTradeValue);
    sellForm.addEventListener('submit', handleSellSubmit);
    loginForm.addEventListener('submit', handleLoginSubmit);
    registerForm.addEventListener('submit', handleRegisterSubmit);
    adminLoginForm.addEventListener('submit', handleAdminLoginSubmit);
    languageSelect.addEventListener('change', event => applyTranslations(event.target.value));
}

// ============= PHONE LISTINGS =============
function loadPhoneListings() {
    phoneListings.innerHTML = '';
    const filtered = getFilteredPhones();
    if (filtered.length === 0) {
        phoneListings.innerHTML = `<p class="loading">${translations[currentLang].loadingListings}</p>`;
        return;
    }
    filtered.forEach(phone => phoneListings.appendChild(createPhoneCard(phone)));
}

function getFilteredPhones() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedBrand = brandFilter.value;

    return mockPhones.filter(phone => {
        const matchesSearch = [phone.brand, phone.model, phone.description, phone.location]
            .some(value => value.toLowerCase().includes(searchTerm));
        const matchesBrand = !selectedBrand || phone.brand === selectedBrand;
        return matchesSearch && matchesBrand;
    });
}

function createPhoneCard(phone) {
    const card = document.createElement('article');
    card.className = 'phone-card';
    card.innerHTML = `
        <img src="${phone.image}" alt="${phone.imageAlt}" loading="lazy">
        <div class="phone-card-content">
            <div>
                <p class="phone-card-subtitle">${phone.brand}</p>
                <h3 class="phone-card-title">${phone.model}</h3>
            </div>
            <p class="phone-card-description">${phone.description}</p>
            <p class="phone-card-meta">${phone.storage} • ${phone.condition} • ${phone.location}</p>
            <p class="phone-card-price">R${phone.price.toLocaleString()}</p>
            <button class="btn btn-secondary" type="button">View Details</button>
        </div>
    `;
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        document.querySelectorAll('.phone-card.selected').forEach(item => item.classList.remove('selected'));
        card.classList.add('selected');
        viewPhoneDetails(phone.id);
    });
    return card;
}

function viewPhoneDetails(phoneId) {
    const phone = mockPhones.find(item => item.id === phoneId);
    if (!phone) return;

    document.getElementById('phoneDetails').innerHTML = `
        <div class="phone-card">
            <img src="${phone.image}" alt="${phone.imageAlt}" loading="lazy">
            <div class="phone-card-content">
                <h3 class="phone-card-title">${phone.brand} ${phone.model}</h3>
                <p class="phone-card-price">R${phone.price.toLocaleString()}</p>
                <p class="phone-card-meta">${phone.storage} • ${phone.condition} • ${phone.location}</p>
                <p class="phone-card-description">${phone.description}</p>
                <p class="phone-card-meta">Seller: ${phone.seller} • ⭐ ${phone.rating}</p>
            </div>
        </div>
    `;
    const modalImage = document.querySelector('#phoneDetails img');
    if (modalImage) {
        modalImage.style.cursor = 'pointer';
        modalImage.title = 'Click to open full-size image';
        modalImage.addEventListener('click', () => window.open(phone.image, '_blank'));
    }
    openModal('phoneModal');
}

// ============= TRADE CALCULATOR =============
function populateNewPhoneOptions() {
    newPhoneSelect.innerHTML = `<option value="">${translations[currentLang].selectPhone}</option>`;
    mockPhones.forEach(phone => {
        const option = document.createElement('option');
        option.value = phone.id;
        option.textContent = `${phone.brand} ${phone.model}`;
        newPhoneSelect.appendChild(option);
    });
}

function calculateTradeValue() {
    const oldBrand = document.getElementById('oldBrand').value;
    const oldModel = document.getElementById('oldModel').value.trim();
    const condition = document.getElementById('condition').value;
    const newPhoneId = parseInt(newPhoneSelect.value, 10);

    if (!oldBrand || !oldModel || !newPhoneId) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    let oldPhoneValue = tradeValues[oldBrand]?.[oldModel] || 5500;
    const conditionMultiplier = { excellent: 1.0, good: 0.85, fair: 0.65, poor: 0.45 };
    oldPhoneValue = Math.round(oldPhoneValue * (conditionMultiplier[condition] || 0.85));

    const newPhone = mockPhones.find(phone => phone.id === newPhoneId);
    const newPhonePrice = newPhone ? newPhone.price : 10000;
    const topup = Math.max(0, newPhonePrice - oldPhoneValue);

    document.getElementById('oldPhoneValue').textContent = `R${oldPhoneValue.toLocaleString()}`;
    document.getElementById('newPhonePrice').textContent = `R${newPhonePrice.toLocaleString()}`;
    document.getElementById('topupAmount').textContent = `R${topup.toLocaleString()}`;
    document.getElementById('tradeResult').classList.remove('hidden');
}

// ============= FORM HANDLERS =============
function handleSellSubmit(event) {
    event.preventDefault();
    const formData = new FormData(sellForm);
    const phoneData = {
        id: mockPhones.length + 1,
        brand: formData.get('brand'),
        model: formData.get('model'),
        price: parseFloat(formData.get('price')) || 0,
        condition: formData.get('condition'),
        storage: formData.get('storage'),
        description: formData.get('description'),
        seller: 'Verified Seller',
        rating: 4.8,
        image: 'https://via.placeholder.com/600x700.png?text=New+Listing',
        imageAlt: formData.get('model'),
        location: 'Johannesburg'
    };

    mockPhones.unshift(phoneData);
    populateNewPhoneOptions();
    loadPhoneListings();
    sellForm.reset();
    sellModal.classList.remove('active');
    showNotification('Your phone listing has been created and is pending verification.');
}

function handleLoginSubmit(event) {
    event.preventDefault();
    const email = loginForm.querySelector('input[name="email"]').value.trim();
    const password = loginForm.querySelector('input[name="password"]').value;

    if (!email || !password) {
        showNotification('Please enter your email and password.', 'error');
        return;
    }

    localStorage.setItem('userEmail', email);
    localStorage.setItem('isLoggedIn', 'true');
    loginForm.reset();
    loginModal.classList.remove('active');
    updateUserUI();
    showNotification('Login successful. Welcome back!');
}

function handleRegisterSubmit(event) {
    event.preventDefault();
    const formData = new FormData(registerForm);
    localStorage.setItem('userEmail', formData.get('email'));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('kycStatus', 'pending');
    registerForm.reset();
    registerModal.classList.remove('active');
    updateUserUI();
    showNotification('Registration successful. Your KYC is pending review.');
}

function handleAdminLoginSubmit(event) {
    event.preventDefault();
    const email = adminLoginForm.querySelector('input[name="email"]').value.trim();
    const password = adminLoginForm.querySelector('input[name="password"]').value;

    if (email.toLowerCase() === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem('adminLoggedIn', 'true');
        adminLoginForm.reset();
        adminLoginModal.classList.remove('active');
        showAdminPanel();
        showNotification('Admin login successful. Customer service and risk tools are active.');
        return;
    }

    showNotification('Admin credentials are incorrect.', 'error');
}

function showAdminPanel() {
    adminPanel.classList.remove('hidden');
    updateAdminSummary();
}

function updateAdminSummary() {
    pendingKycCount.textContent = '4';
    fraudAlertsCount.textContent = '2';
    supportTicketsCount.textContent = '6';
    blockedAccountsCount.textContent = '1';
}

function updateUserUI() {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    loginLink.textContent = loggedIn ? 'Logout' : translations[currentLang].navLogin;
    registerLink.style.display = loggedIn ? 'none' : 'inline-flex';
}

function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('kycStatus');
    updateUserUI();
    showNotification('You have been logged out.');
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3200);
}

function applyTranslations(lang) {
    if (!translations[lang]) {
        lang = 'en';
    }
    currentLang = lang;
    localStorage.setItem('mobileTradeLang', lang);
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    populateNewPhoneOptions();
    loadPhoneListings();
    updateUserUI();
}

window.addEventListener('DOMContentLoaded', () => {
    initializeModals();
    loadPhoneListings();
    populateNewPhoneOptions();
    setupEventListeners();
    applyTranslations(currentLang);
    languageSelect.value = currentLang;
    updateUserUI();
    updateAdminSummary();
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        showAdminPanel();
    }
});
