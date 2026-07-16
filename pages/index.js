import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const BRAND = '#4f46e5';
const BRAND_GRADIENT = 'linear-gradient(135deg, #4f46e5, #7c3aed)';
const BRAND_LIGHT = '#eef2ff';

const localeMeta = {
  en: { flag: '🇺🇸', name: 'English' },
  zh: { flag: '🇨🇳', name: '中文' },
  es: { flag: '🇪🇸', name: 'Español' },
  fr: { flag: '🇫🇷', name: 'Français' },
  de: { flag: '🇩🇪', name: 'Deutsch' },
  ja: { flag: '🇯🇵', name: '日本語' },
  ko: { flag: '🇰🇷', name: '한국어' },
};

const t = {
  en: {
    siteName: 'Sylveris Sitemap',
    title: 'Sylveris Sitemap - Free Sitemap Generator | XML Sitemap Tool',
    desc: 'Sylveris Sitemap is a free online sitemap generator supporting XML, HTML, and TXT export formats. Automatically crawl website pages and generate sitemap files compliant with Google, Bing, and Baidu search engine standards.',
    keywords: 'sitemap generator, XML sitemap, sitemap tool, free sitemap maker, SEO sitemap, create sitemap, website sitemap, Google sitemap',
    navTool: 'Tool',
    navFeatures: 'Features',
    navGuide: 'Guide',
    heroBadge: 'Free · No signup required',
    heroTitle1: 'Generate',
    heroTitle2: 'Sitemaps',
    heroDesc: 'Enter website URLs to automatically crawl pages and generate sitemap files compliant with the sitemaps.org protocol. Supports XML, HTML, and TXT export formats for Google, Bing, and Baidu.',
    toolTitle: 'Generate Your Sitemap',
    toolDesc: 'Supports multiple URLs, one per line',
    urlLabel: 'Website URLs',
    urlPlaceholder: 'https://example.com\nhttps://another-site.com',
    formatTitle: 'Output Format',
    formatXml: 'XML Format',
    formatXmlDesc: 'Search engine standard protocol',
    formatHtml: 'HTML Format',
    formatHtmlDesc: 'User navigation page',
    formatTxt: 'TXT Format',
    formatTxtDesc: 'Plain text URL list',
    seoTitle: 'SEO Options',
    seoPriority: 'Smart Priority',
    seoPriorityDesc: 'Auto-assign based on depth',
    seoLastmod: 'Last Modified',
    seoLastmodDesc: 'Include lastmod tag',
    seoChangefreq: 'Change Frequency',
    seoChangefreqDesc: 'Set changefreq tag',
    btnGenerate: 'Generate Sitemap',
    btnGenerating: 'Crawling...',
    errEmpty: 'Please enter at least one URL',
    errInvalid: 'Invalid URL format',
    errNoResult: 'No pages found. Please check if the website is accessible.',
    errGeneric: 'Request failed',
    logUrls: 'URLs',
    resultXml: 'XML Code',
    resultUrls: 'URL List',
    resultHtml: 'HTML Preview',
    btnCopy: 'Copy',
    btnDownloadXml: 'Download XML',
    btnDownloadTxt: 'Download TXT',
    btnDownloadHtml: 'Download HTML',
    featuresTitle: 'Features',
    featuresDesc: 'Why choose Sylveris Sitemap',
    feat1Title: 'Real Crawling',
    feat1Desc: 'Accesses target websites via HTTP requests and parses actual page links. No fake URLs generated.',
    feat2Title: 'Multi-site Support',
    feat2Desc: 'Crawl multiple websites in one task. Automatically merges and deduplicates results into a single sitemap.',
    feat3Title: 'Standard Compliant',
    feat3Desc: 'Strictly follows the sitemaps.org protocol. Generated XML files can be submitted directly to Google, Bing, and Baidu.',
    feat4Title: 'Multi-format Export',
    feat4Desc: 'Supports XML (search engine indexing), HTML (user navigation), and TXT (plain text list) formats.',
    feat5Title: 'Smart Parameters',
    feat5Desc: 'Automatically calculates priority and changefreq based on URL depth. No manual configuration needed.',
    feat6Title: 'Privacy Safe',
    feat6Desc: 'No account registration required. No personal data collected. Crawled data is only used for file generation and never stored.',
    guideTitle: 'How It Works',
    guideDesc: 'Three steps to generate your sitemap',
    step1Title: 'Enter URLs',
    step1Desc: 'Enter one or more website addresses in the text box, one per line, starting with http:// or https://.',
    step2Title: 'Choose Options',
    step2Desc: 'Select desired output formats and SEO parameters according to your needs.',
    step3Title: 'Download & Deploy',
    step3Desc: 'Download the generated file, upload sitemap.xml to your website root, and submit it to search engine consoles.',
    aboutTitle: 'About Sylveris Sitemap',
    aboutDesc1: 'Sylveris Sitemap crawls HTML pages of target websites via HTTP requests, extracts links for recursive collection. Max depth: 5 levels, max 200 URLs per site, no limit on the number of sites per task.',
    aboutDesc2: 'Note: Some websites have anti-crawling mechanisms, require JavaScript rendering, or are behind login walls. Such pages may not be collected correctly.',
    footer: 'Sylveris Sitemap',
    langSwitch: 'Language',
  },
  zh: {
    siteName: 'Sylveris Sitemap',
    title: 'Sylveris Sitemap - 免费站点地图生成器 | XML Sitemap 工具',
    desc: 'Sylveris Sitemap 是一款免费的在线站点地图生成工具，支持 XML、HTML、TXT 格式导出。自动爬取网站页面，生成符合 Google、Bing、Baidu 搜索引擎标准的 sitemap 文件。',
    keywords: '站点地图生成器, sitemap生成, XML站点地图, 网站地图工具, sitemap.xml, SEO工具, 搜索引擎优化',
    navTool: '工具',
    navFeatures: '功能',
    navGuide: '指南',
    heroBadge: '免费使用 · 无需注册',
    heroTitle1: '免费生成',
    heroTitle2: '站点地图',
    heroDesc: '输入网站地址，自动爬取页面并生成符合 sitemaps.org 协议的站点地图文件。支持 XML、HTML、TXT 三种格式导出，可提交至 Google、Bing、Baidu 等搜索引擎。',
    toolTitle: '生成您的站点地图',
    toolDesc: '支持同时输入多个网站地址，每行一个',
    urlLabel: '网站地址',
    urlPlaceholder: 'https://example.com\nhttps://another-site.com',
    formatTitle: '输出格式',
    formatXml: 'XML 格式',
    formatXmlDesc: '搜索引擎标准协议',
    formatHtml: 'HTML 格式',
    formatHtmlDesc: '用户导航页面',
    formatTxt: 'TXT 格式',
    formatTxtDesc: '纯文本 URL 列表',
    seoTitle: 'SEO 选项',
    seoPriority: '智能优先级',
    seoPriorityDesc: '根据页面深度自动分配',
    seoLastmod: '最后修改时间',
    seoLastmodDesc: '包含 lastmod 标签',
    seoChangefreq: '更新频率',
    seoChangefreqDesc: '设置 changefreq 标签',
    btnGenerate: '生成站点地图',
    btnGenerating: '正在爬取...',
    errEmpty: '请输入至少一个网站地址',
    errInvalid: 'URL 格式错误',
    errNoResult: '未爬取到任何页面，请检查网站是否可访问',
    errGeneric: '请求失败',
    logUrls: '个 URL',
    resultXml: 'XML 代码',
    resultUrls: 'URL 列表',
    resultHtml: 'HTML 预览',
    btnCopy: '复制',
    btnDownloadXml: '下载 XML',
    btnDownloadTxt: '下载 TXT',
    btnDownloadHtml: '下载 HTML',
    featuresTitle: '功能特性',
    featuresDesc: '为什么选择 Sylveris Sitemap',
    feat1Title: '真实爬取',
    feat1Desc: '通过 HTTP 请求访问目标网站，解析实际存在的页面链接，不生成虚假 URL。',
    feat2Title: '多站点支持',
    feat2Desc: '一次任务可同时爬取多个网站，自动合并去重，生成统一的站点地图文件。',
    feat3Title: '标准合规',
    feat3Desc: '严格遵循 sitemaps.org 协议，生成的 XML 文件可直接提交至 Google、Bing、Baidu 等搜索引擎。',
    feat4Title: '多格式导出',
    feat4Desc: '同时支持 XML（搜索引擎索引）、HTML（用户导航页）、TXT（纯文本列表）三种格式。',
    feat5Title: '智能参数',
    feat5Desc: '根据 URL 深度自动计算 priority 和 changefreq，无需手动配置每个页面。',
    feat6Title: '隐私安全',
    feat6Desc: '无需注册账号，不收集个人信息，爬取数据仅用于生成文件，不做任何存储。',
    guideTitle: '使用指南',
    guideDesc: '三步完成站点地图生成',
    step1Title: '输入地址',
    step1Desc: '在文本框中输入一个或多个网站地址，每行一个，确保以 http:// 或 https:// 开头。',
    step2Title: '选择配置',
    step2Desc: '勾选需要的输出格式和 SEO 参数，根据需求自定义生成内容。',
    step3Title: '下载部署',
    step3Desc: '生成完成后下载文件，将 sitemap.xml 上传至网站根目录并提交至搜索引擎控制台。',
    aboutTitle: '关于 Sylveris Sitemap',
    aboutDesc1: 'Sylveris Sitemap 通过 HTTP 请求爬取目标网站的 HTML 页面，提取其中的链接进行递归采集，最大深度 5 层，单站最多 200 个 URL，单次任务不限制网站数量。',
    aboutDesc2: '注意：部分网站设有反爬机制、需要 JavaScript 渲染或处于登录保护状态，此类页面可能无法被正确采集。',
    footer: 'Sylveris Sitemap',
    langSwitch: '语言',
  },
  es: {
    siteName: 'Sylveris Sitemap',
    title: 'Sylveris Sitemap - Generador de Mapas de Sitio Gratuito | Herramienta XML Sitemap',
    desc: 'Sylveris Sitemap es una herramienta gratuita en línea para generar mapas de sitio que soporta formatos XML, HTML y TXT. Rastrea automáticamente las páginas web y genera archivos sitemap conformes a los estándares de Google, Bing y Baidu.',
    keywords: 'generador de sitemap, sitemap XML, herramienta sitemap, creador de sitemap gratuito, SEO sitemap, crear sitemap, sitemap web, Google sitemap',
    navTool: 'Herramienta',
    navFeatures: 'Funciones',
    navGuide: 'Guía',
    heroBadge: 'Gratis · Sin registro',
    heroTitle1: 'Genera',
    heroTitle2: 'Mapas de Sitio',
    heroDesc: 'Introduce las URLs del sitio web para rastrear automáticamente las páginas y generar archivos de mapa de sitio conformes al protocolo sitemaps.org. Soporta formatos de exportación XML, HTML y TXT para Google, Bing y Baidu.',
    toolTitle: 'Genera tu Mapa de Sitio',
    toolDesc: 'Soporta múltiples URLs, una por línea',
    urlLabel: 'URLs del sitio web',
    urlPlaceholder: 'https://example.com\nhttps://another-site.com',
    formatTitle: 'Formato de salida',
    formatXml: 'Formato XML',
    formatXmlDesc: 'Protocolo estándar de motores de búsqueda',
    formatHtml: 'Formato HTML',
    formatHtmlDesc: 'Página de navegación para usuarios',
    formatTxt: 'Formato TXT',
    formatTxtDesc: 'Lista de URLs en texto plano',
    seoTitle: 'Opciones SEO',
    seoPriority: 'Prioridad inteligente',
    seoPriorityDesc: 'Asignación automática basada en la profundidad',
    seoLastmod: 'Última modificación',
    seoLastmodDesc: 'Incluir etiqueta lastmod',
    seoChangefreq: 'Frecuencia de cambio',
    seoChangefreqDesc: 'Establecer etiqueta changefreq',
    btnGenerate: 'Generar Sitemap',
    btnGenerating: 'Rastreando...',
    errEmpty: 'Por favor introduce al menos una URL',
    errInvalid: 'Formato de URL inválido',
    errNoResult: 'No se encontraron páginas. Por favor verifica si el sitio web es accesible.',
    errGeneric: 'Solicitud fallida',
    logUrls: 'URLs',
    resultXml: 'Código XML',
    resultUrls: 'Lista de URLs',
    resultHtml: 'Vista previa HTML',
    btnCopy: 'Copiar',
    btnDownloadXml: 'Descargar XML',
    btnDownloadTxt: 'Descargar TXT',
    btnDownloadHtml: 'Descargar HTML',
    featuresTitle: 'Características',
    featuresDesc: 'Por qué elegir Sylveris Sitemap',
    feat1Title: 'Rastreo Real',
    feat1Desc: 'Accede a los sitios web objetivo mediante solicitudes HTTP y analiza los enlaces de página reales. No se generan URLs falsas.',
    feat2Title: 'Soporte Multi-sitio',
    feat2Desc: 'Rastrea múltiples sitios web en una tarea. Fusiona y elimina duplicados automáticamente en un solo sitemap.',
    feat3Title: 'Cumplimiento de Estándares',
    feat3Desc: 'Sigue estrictamente el protocolo sitemaps.org. Los archivos XML generados pueden enviarse directamente a Google, Bing y Baidu.',
    feat4Title: 'Exportación Multi-formato',
    feat4Desc: 'Soporta formatos XML (indexación de motores de búsqueda), HTML (navegación de usuarios) y TXT (lista de texto plano).',
    feat5Title: 'Parámetros Inteligentes',
    feat5Desc: 'Calcula automáticamente priority y changefreq basado en la profundidad de la URL. No requiere configuración manual.',
    feat6Title: 'Privacidad Segura',
    feat6Desc: 'No requiere registro de cuenta. No se recogen datos personales. Los datos rastreados solo se usan para generar archivos y nunca se almacenan.',
    guideTitle: 'Cómo Funciona',
    guideDesc: 'Tres pasos para generar tu sitemap',
    step1Title: 'Introduce URLs',
    step1Desc: 'Introduce una o más direcciones web en el cuadro de texto, una por línea, comenzando con http:// o https://.',
    step2Title: 'Elige Opciones',
    step2Desc: 'Selecciona los formatos de salida y parámetros SEO deseados según tus necesidades.',
    step3Title: 'Descarga e Implementa',
    step3Desc: 'Descarga el archivo generado, sube sitemap.xml al directorio raíz de tu sitio web y envíalo a las consolas de motores de búsqueda.',
    aboutTitle: 'Acerca de Sylveris Sitemap',
    aboutDesc1: 'Sylveris Sitemap rastrea páginas HTML de sitios web objetivo mediante solicitudes HTTP, extrae enlaces para recolección recursiva. Profundidad máxima: 5 niveles, máximo 200 URLs por sitio, sin límite de sitios por tarea.',
    aboutDesc2: 'Nota: Algunos sitios web tienen mecanismos anti-rastreo, requieren renderizado JavaScript o están protegidos por inicio de sesión. Tales páginas pueden no ser recolectadas correctamente.',
    footer: 'Sylveris Sitemap',
    langSwitch: 'Idioma',
  },
  fr: {
    siteName: 'Sylveris Sitemap',
    title: 'Sylveris Sitemap - Générateur de Plan de Site Gratuit | Outil XML Sitemap',
    desc: 'Sylveris Sitemap est un outil en ligne gratuit pour générer des plans de site prenant en charge les formats XML, HTML et TXT. Explore automatiquement les pages web et génère des fichiers sitemap conformes aux normes de Google, Bing et Baidu.',
    keywords: 'générateur de sitemap, sitemap XML, outil sitemap, créateur de sitemap gratuit, SEO sitemap, créer sitemap, sitemap site web, Google sitemap',
    navTool: 'Outil',
    navFeatures: 'Fonctionnalités',
    navGuide: 'Guide',
    heroBadge: 'Gratuit · Sans inscription',
    heroTitle1: 'Générez des',
    heroTitle2: 'Plans de Site',
    heroDesc: "Entrez les URLs du site web pour explorer automatiquement les pages et générer des fichiers de plan de site conformes au protocole sitemaps.org. Prend en charge les formats d\'exportation XML, HTML et TXT pour Google, Bing et Baidu.",
    toolTitle: 'Générez votre Plan de Site',
    toolDesc: 'Prend en charge plusieurs URLs, une par ligne',
    urlLabel: 'URLs du site web',
    urlPlaceholder: 'https://example.com\nhttps://another-site.com',
    formatTitle: 'Format de sortie',
    formatXml: 'Format XML',
    formatXmlDesc: 'Protocole standard des moteurs de recherche',
    formatHtml: 'Format HTML',
    formatHtmlDesc: 'Page de navigation pour utilisateurs',
    formatTxt: 'Format TXT',
    formatTxtDesc: "Liste d\'URLs en texte brut",
    seoTitle: 'Options SEO',
    seoPriority: 'Priorité intelligente',
    seoPriorityDesc: 'Attribution automatique basée sur la profondeur',
    seoLastmod: 'Dernière modification',
    seoLastmodDesc: 'Inclure la balise lastmod',
    seoChangefreq: 'Fréquence de changement',
    seoChangefreqDesc: 'Définir la balise changefreq',
    btnGenerate: 'Générer le Sitemap',
    btnGenerating: 'Exploration...',
    errEmpty: 'Veuillez entrer au moins une URL',
    errInvalid: "Format d\'URL invalide",
    errNoResult: 'Aucune page trouvée. Veuillez vérifier si le site web est accessible.',
    errGeneric: 'Échec de la requête',
    logUrls: 'URLs',
    resultXml: 'Code XML',
    resultUrls: "Liste d\'URLs",
    resultHtml: 'Aperçu HTML',
    btnCopy: 'Copier',
    btnDownloadXml: 'Télécharger XML',
    btnDownloadTxt: 'Télécharger TXT',
    btnDownloadHtml: 'Télécharger HTML',
    featuresTitle: 'Fonctionnalités',
    featuresDesc: 'Pourquoi choisir Sylveris Sitemap',
    feat1Title: 'Exploration Réelle',
    feat1Desc: 'Accède aux sites web cibles via des requêtes HTTP et analyse les liens de page réels. Aucune URL fausse générée.',
    feat2Title: 'Support Multi-sites',
    feat2Desc: 'Explore plusieurs sites web en une tâche. Fusionne et déduplique automatiquement les résultats en un seul sitemap.',
    feat3Title: 'Conformité aux Normes',
    feat3Desc: 'Respecte strictement le protocole sitemaps.org. Les fichiers XML générés peuvent être soumis directement à Google, Bing et Baidu.',
    feat4Title: 'Export Multi-formats',
    feat4Desc: 'Prend en charge les formats XML (indexation moteurs de recherche), HTML (navigation utilisateurs) et TXT (liste texte brut).',
    feat5Title: 'Paramètres Intelligents',
    feat5Desc: "Calcule automatiquement priority et changefreq basé sur la profondeur de l\'URL. Aucune configuration manuelle requise.",
    feat6Title: 'Confidentialité Sécurisée',
    feat6Desc: 'Aucun enregistrement de compte requis. Aucune donnée personnelle collectée. Les données explorées sont uniquement utilisées pour générer des fichiers et jamais stockées.',
    guideTitle: 'Comment ça Marche',
    guideDesc: 'Trois étapes pour générer votre sitemap',
    step1Title: 'Entrez les URLs',
    step1Desc: 'Entrez une ou plusieurs adresses web dans la zone de texte, une par ligne, commençant par http:// ou https://.',
    step2Title: 'Choisissez les Options',
    step2Desc: 'Sélectionnez les formats de sortie et paramètres SEO souhaités selon vos besoins.',
    step3Title: 'Téléchargez & Déployez',
    step3Desc: 'Téléchargez le fichier généré, uploadez sitemap.xml à la racine de votre site web et soumettez-le aux consoles de moteurs de recherche.',
    aboutTitle: 'À propos de Sylveris Sitemap',
    aboutDesc1: 'Sylveris Sitemap explore les pages HTML des sites web cibles via des requêtes HTTP, extrait les liens pour collecte récursive. Profondeur max : 5 niveaux, max 200 URLs par site, pas de limite de sites par tâche.',
    aboutDesc2: 'Note : Certains sites web ont des mécanismes anti-exploration, nécessitent un rendu JavaScript ou sont protégés par connexion. Ces pages peuvent ne pas être collectées correctement.',
    footer: 'Sylveris Sitemap',
    langSwitch: 'Langue',
  },
  de: {
    siteName: 'Sylveris Sitemap',
    title: 'Sylveris Sitemap - Kostenloser Sitemap-Generator | XML Sitemap Tool',
    desc: 'Sylveris Sitemap ist ein kostenloses Online-Tool zum Erstellen von Sitemaps, das die Formate XML, HTML und TXT unterstützt. Crawlt automatisch Webseiten und generiert Sitemap-Dateien, die den Standards von Google, Bing und Baidu entsprechen.',
    keywords: 'sitemap generator, XML sitemap, sitemap tool, kostenloser sitemap maker, SEO sitemap, sitemap erstellen, website sitemap, Google sitemap',
    navTool: 'Tool',
    navFeatures: 'Funktionen',
    navGuide: 'Anleitung',
    heroBadge: 'Kostenlos · Keine Anmeldung',
    heroTitle1: 'Generiere',
    heroTitle2: 'Sitemaps',
    heroDesc: 'Gib Website-URLs ein, um Seiten automatisch zu crawlen und Sitemap-Dateien zu generieren, die dem sitemaps.org-Protokoll entsprechen. Unterstützt XML-, HTML- und TXT-Exportformate für Google, Bing und Baidu.',
    toolTitle: 'Generiere deine Sitemap',
    toolDesc: 'Unterstützt mehrere URLs, eine pro Zeile',
    urlLabel: 'Website-URLs',
    urlPlaceholder: 'https://example.com\nhttps://another-site.com',
    formatTitle: 'Ausgabeformat',
    formatXml: 'XML-Format',
    formatXmlDesc: 'Standardprotokoll für Suchmaschinen',
    formatHtml: 'HTML-Format',
    formatHtmlDesc: 'Benutzernavigationsseite',
    formatTxt: 'TXT-Format',
    formatTxtDesc: 'Klartext-URL-Liste',
    seoTitle: 'SEO-Optionen',
    seoPriority: 'Intelligente Priorität',
    seoPriorityDesc: 'Automatische Zuweisung basierend auf Tiefe',
    seoLastmod: 'Zuletzt geändert',
    seoLastmodDesc: 'Lastmod-Tag einbeziehen',
    seoChangefreq: 'Änderungsfrequenz',
    seoChangefreqDesc: 'Changefreq-Tag festlegen',
    btnGenerate: 'Sitemap generieren',
    btnGenerating: 'Crawling...',
    errEmpty: 'Bitte gib mindestens eine URL ein',
    errInvalid: 'Ungültiges URL-Format',
    errNoResult: 'Keine Seiten gefunden. Bitte prüfe, ob die Website erreichbar ist.',
    errGeneric: 'Anfrage fehlgeschlagen',
    logUrls: 'URLs',
    resultXml: 'XML-Code',
    resultUrls: 'URL-Liste',
    resultHtml: 'HTML-Vorschau',
    btnCopy: 'Kopieren',
    btnDownloadXml: 'XML herunterladen',
    btnDownloadTxt: 'TXT herunterladen',
    btnDownloadHtml: 'HTML herunterladen',
    featuresTitle: 'Funktionen',
    featuresDesc: 'Warum Sylveris Sitemap wählen',
    feat1Title: 'Echtes Crawling',
    feat1Desc: 'Greift auf Zielwebsites über HTTP-Anfragen zu und analysiert tatsächliche Seitenlinks. Es werden keine gefälschten URLs generiert.',
    feat2Title: 'Multi-Site-Unterstützung',
    feat2Desc: 'Crawle mehrere Websites in einem Auftrag. Ergebnisse automatisch zusammenführen und Duplikate entfernen.',
    feat3Title: 'Standardkonform',
    feat3Desc: 'Befolgt strikt das sitemaps.org-Protokoll. Generierte XML-Dateien können direkt an Google, Bing und Baidu übermittelt werden.',
    feat4Title: 'Multi-Format-Export',
    feat4Desc: 'Unterstützt XML (Suchmaschinen-Indexierung), HTML (Benutzernavigation) und TXT (Klartext-Liste).',
    feat5Title: 'Intelligente Parameter',
    feat5Desc: 'Berechnet automatisch Priority und Changefreq basierend auf URL-Tiefe. Keine manuelle Konfiguration erforderlich.',
    feat6Title: 'Datenschutz sicher',
    feat6Desc: 'Keine Kontoanmeldung erforderlich. Keine personenbezogenen Daten werden gesammelt. Gecrawlte Daten werden nur zur Dateigenerierung verwendet und nie gespeichert.',
    guideTitle: 'So funktioniert es',
    guideDesc: 'Drei Schritte zur Sitemap-Generierung',
    step1Title: 'URLs eingeben',
    step1Desc: 'Gib eine oder mehrere Webadressen in das Textfeld ein, eine pro Zeile, beginnend mit http:// oder https://.',
    step2Title: 'Optionen wählen',
    step2Desc: 'Wähle gewünschte Ausgabeformate und SEO-Parameter entsprechend deinen Bedürfnissen.',
    step3Title: 'Herunterladen & Bereitstellen',
    step3Desc: 'Lade die generierte Datei herunter, lade sitemap.xml in das Stammverzeichnis deiner Website hoch und übermittle sie an die Suchmaschinen-Konsolen.',
    aboutTitle: 'Über Sylveris Sitemap',
    aboutDesc1: 'Sylveris Sitemap crawlt HTML-Seiten von Zielwebsites über HTTP-Anfragen, extrahiert Links für rekursive Sammlung. Max. Tiefe: 5 Ebenen, max. 200 URLs pro Website, keine Begrenzung der Website-Anzahl pro Auftrag.',
    aboutDesc2: 'Hinweis: Einige Websites haben Anti-Crawling-Mechanismen, erfordern JavaScript-Rendering oder sind durch Login geschützt. Solche Seiten können möglicherweise nicht korrekt erfasst werden.',
    footer: 'Sylveris Sitemap',
    langSwitch: 'Sprache',
  },
  ja: {
    siteName: 'Sylveris Sitemap',
    title: 'Sylveris Sitemap - 無料サイトマップ生成ツール | XML Sitemap ツール',
    desc: 'Sylveris Sitemapは、XML、HTML、TXT形式のエクスポートをサポートする無料のオンラインサイトマップ生成ツールです。Webサイトを自動的にクロールし、Google、Bing、Baiduの検索エンジン標準に準拠したサイトマップファイルを生成します。',
    keywords: 'サイトマップ生成ツール, XMLサイトマップ, サイトマップツール, 無料サイトマップ作成, SEOサイトマップ, サイトマップ作成, ウェブサイトマップ, Googleサイトマップ',
    navTool: 'ツール',
    navFeatures: '機能',
    navGuide: 'ガイド',
    heroBadge: '無料 · 登録不要',
    heroTitle1: '無料で',
    heroTitle2: 'サイトマップを生成',
    heroDesc: 'WebサイトのURLを入力すると、ページを自動的にクロールし、sitemaps.orgプロトコルに準拠したサイトマップファイルを生成します。XML、HTML、TXTの3形式に対応し、Google、Bing、Baiduなどの検索エンジンに対応しています。',
    toolTitle: 'サイトマップを生成',
    toolDesc: '複数のURLを同時に入力可能（1行に1つ）',
    urlLabel: 'WebサイトURL',
    urlPlaceholder: 'https://example.com\nhttps://another-site.com',
    formatTitle: '出力形式',
    formatXml: 'XML形式',
    formatXmlDesc: '検索エンジン標準プロトコル',
    formatHtml: 'HTML形式',
    formatHtmlDesc: 'ユーザーナビゲーションページ',
    formatTxt: 'TXT形式',
    formatTxtDesc: 'プレーンテキストURLリスト',
    seoTitle: 'SEOオプション',
    seoPriority: 'スマート優先度',
    seoPriorityDesc: 'ページ深度に基づく自動割り当て',
    seoLastmod: '最終更新日',
    seoLastmodDesc: 'lastmodタグを含める',
    seoChangefreq: '更新頻度',
    seoChangefreqDesc: 'changefreqタグを設定',
    btnGenerate: 'サイトマップを生成',
    btnGenerating: 'クロール中...',
    errEmpty: '少なくとも1つのURLを入力してください',
    errInvalid: 'URL形式が無効です',
    errNoResult: 'ページが見つかりませんでした。Webサイトにアクセスできるか確認してください。',
    errGeneric: 'リクエストに失敗しました',
    logUrls: '件のURL',
    resultXml: 'XMLコード',
    resultUrls: 'URLリスト',
    resultHtml: 'HTMLプレビュー',
    btnCopy: 'コピー',
    btnDownloadXml: 'XMLをダウンロード',
    btnDownloadTxt: 'TXTをダウンロード',
    btnDownloadHtml: 'HTMLをダウンロード',
    featuresTitle: '機能特徴',
    featuresDesc: 'Sylveris Sitemapを選ぶ理由',
    feat1Title: '実際のクロール',
    feat1Desc: 'HTTPリクエストで対象Webサイトにアクセスし、実際に存在するページリンクを解析します。偽のURLは生成しません。',
    feat2Title: 'マルチサイト対応',
    feat2Desc: '1回のタスクで複数のWebサイトを同時にクロールし、自動的に重複を排除して統一されたサイトマップファイルを生成します。',
    feat3Title: '標準準拠',
    feat3Desc: 'sitemaps.orgプロトコルを厳密に遵守し、生成されたXMLファイルはGoogle、Bing、Baiduなどの検索エンジンに直接提出可能です。',
    feat4Title: '多形式エクスポート',
    feat4Desc: 'XML（検索エンジン索引）、HTML（ユーザーナビゲーション）、TXT（プレーンテキストリスト）の3形式を同時にサポートします。',
    feat5Title: 'スマートパラメータ',
    feat5Desc: 'URLの深度に基づいてpriorityとchangefreqを自動計算します。各ページの手動設定は不要です。',
    feat6Title: 'プライバシー安全',
    feat6Desc: 'アカウント登録不要。個人情報を収集しません。クロールデータはファイル生成のみに使用し、一切保存しません。',
    guideTitle: '使用ガイド',
    guideDesc: '3ステップでサイトマップ生成完了',
    step1Title: 'URLを入力',
    step1Desc: 'テキストボックスに1つまたは複数のWebサイトアドレスを入力します（1行に1つ、http://またはhttps://で始めてください）。',
    step2Title: '設定を選択',
    step2Desc: '必要な出力形式とSEOパラメータをチェックし、ニーズに応じて生成内容をカスタマイズします。',
    step3Title: 'ダウンロードとデプロイ',
    step3Desc: '生成完了後にファイルをダウンロードし、sitemap.xmlをWebサイトのルートディレクトリにアップロードして検索エンジンコンソールに提出します。',
    aboutTitle: 'Sylveris Sitemapについて',
    aboutDesc1: 'Sylveris SitemapはHTTPリクエストを通じて対象WebサイトのHTMLページをクロールし、リンクを抽出して再帰的に収集します。最大深度：5層、1サイト最大200URL、1回のタスクでサポートするサイト数に制限はありません。',
    aboutDesc2: '注意：一部のWebサイトにはアンチクロール機構、JavaScriptレンダリングが必要なページ、またはログイン保護されたページがあります。このようなページは正しく収集できない場合があります。',
    footer: 'Sylveris Sitemap',
    langSwitch: '言語',
  },
  ko: {
    siteName: 'Sylveris Sitemap',
    title: 'Sylveris Sitemap - 무료 사이트맵 생성기 | XML Sitemap 도구',
    desc: 'Sylveris Sitemap은 XML, HTML, TXT 형식내보내기를 지원하는 무료 온라인 사이트맵 생성 도구입니다. 웹사이트를 자동으로 크롤링하고 Google, Bing, Baidu 검색 엔진 표준에 맞는 사이트맵 파일을 생성합니다.',
    keywords: '사이트맵 생성기, XML 사이트맵, 사이트맵 도구, 무료 사이트맵 메이커, SEO 사이트맵, 사이트맵 만들기, 웹사이트 사이트맵, Google 사이트맵',
    navTool: '도구',
    navFeatures: '기능',
    navGuide: '가이드',
    heroBadge: '무료 · 등록 불필요',
    heroTitle1: '무료로',
    heroTitle2: '사이트맵 생성',
    heroDesc: '웹사이트 URL을 입력하면 페이지를 자동으로 크롤링하고 sitemaps.org 프로토콜을 준수하는 사이트맵 파일을 생성합니다. XML, HTML, TXT 세 가지 형식을 지원하며 Google, Bing, Baidu 등의 검색 엔진에 제출할 수 있습니다.',
    toolTitle: '사이트맵 생성하기',
    toolDesc: '여러 URL을 동시에 입력할 수 있습니다(줄당 하나)',
    urlLabel: '웹사이트 URL',
    urlPlaceholder: 'https://example.com\nhttps://another-site.com',
    formatTitle: '출력 형식',
    formatXml: 'XML 형식',
    formatXmlDesc: '검색 엔진 표준 프로토콜',
    formatHtml: 'HTML 형식',
    formatHtmlDesc: '사용자 탐색 페이지',
    formatTxt: 'TXT 형식',
    formatTxtDesc: '일반 텍스트 URL 목록',
    seoTitle: 'SEO 옵션',
    seoPriority: '스마트 우선순위',
    seoPriorityDesc: '페이지 깊이에 따른 자동 할당',
    seoLastmod: '최종 수정 시간',
    seoLastmodDesc: 'lastmod 태그 포함',
    seoChangefreq: '업데이트 주기',
    seoChangefreqDesc: 'changefreq 태그 설정',
    btnGenerate: '사이트맵 생성',
    btnGenerating: '크롤링 중...',
    errEmpty: '최소한 하나의 URL을 입력하세요',
    errInvalid: 'URL 형식이 잘못되었습니다',
    errNoResult: '페이지를 찾을 수 없습니다. 웹사이트에 접근 가능한지 확인하세요.',
    errGeneric: '요청 실패',
    logUrls: '개 URL',
    resultXml: 'XML 코드',
    resultUrls: 'URL 목록',
    resultHtml: 'HTML 미리보기',
    btnCopy: '복사',
    btnDownloadXml: 'XML 다운로드',
    btnDownloadTxt: 'TXT 다운로드',
    btnDownloadHtml: 'HTML 다운로드',
    featuresTitle: '기능 특징',
    featuresDesc: 'Sylveris Sitemap을 선택하는 이유',
    feat1Title: '실제 크롤링',
    feat1Desc: 'HTTP 요청을 통해 대상 웹사이트에 접근하고 실제 페이지 링크를 분석합니다. 가짜 URL을 생성하지 않습니다.',
    feat2Title: '다중 사이트 지원',
    feat2Desc: '한 번의 작업으로 여러 웹사이트를 동시에 크롤링하고, 자동으로 병합 및 중복 제거하여 통합된 사이트맵 파일을 생성합니다.',
    feat3Title: '표준 준수',
    feat3Desc: 'sitemaps.org 프로토콜을 엄격히 준수하며, 생성된 XML 파일은 Google, Bing, Baidu 등의 검색 엔진에 직접 제출할 수 있습니다.',
    feat4Title: '다중 형식내보내기',
    feat4Desc: 'XML(검색 엔진 색인), HTML(사용자 탐색), TXT(일반 텍스트 목록) 세 가지 형식을 동시에 지원합니다.',
    feat5Title: '스마트 매개변수',
    feat5Desc: 'URL 깊이에 따라 priority와 changefreq를 자동으로 계산합니다. 각 페이지의 수동 구성이 필요 없습니다.',
    feat6Title: '프라이버시 안전',
    feat6Desc: '계정 등록이 필요 없습니다. 개인 정보를 수집하지 않습니다. 크롤링 데이터는 파일 생성에만 사용되며 어떠한 저장도 하지 않습니다.',
    guideTitle: '사용 가이드',
    guideDesc: '세 단계로 사이트맵 생성 완료',
    step1Title: '주소 입력',
    step1Desc: '텍스트 상자에 하나 이상의 웹사이트 주소를 입력하세요. 줄당 하나씩, http:// 또는 https://로 시작해야 합니다.',
    step2Title: '구성 선택',
    step2Desc: '필요한 출력 형식과 SEO 매개변수를 선택하여 요구에 맞게 생성 내용을 사용자 지정하세요.',
    step3Title: '다운로드 및 배포',
    step3Desc: '생성이 완료되면 파일을 다운로드하고, sitemap.xml을 웹사이트 루트 디렉토리에 업로드한 후 검색 엔진 콘솔에 제출하세요.',
    aboutTitle: 'Sylveris Sitemap 소개',
    aboutDesc1: 'Sylveris Sitemap은 HTTP 요청을 통해 대상 웹사이트의 HTML 페이지를 크롤링하고, 링크를 추출하여 재귀적으로 수집합니다. 최대 깊이: 5단계, 사이트당 최대 200URL, 작업당 지원하는 사이트 수에 제한이 없습니다.',
    aboutDesc2: '참고: 일부 웹사이트는 안티 크롤링 메커니즘, JavaScript 렌더링 필요 또는 로그인 보호 상태입니다. 이러한 페이지는 올바르게 수집되지 않을 수 있습니다.',
    footer: 'Sylveris Sitemap',
    langSwitch: '언어',
  },
};

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

export default function Home() {
  const router = useRouter();
  const locale = router.locale || 'en';
  const tx = t[locale] || t['en'];

  const [urls, setUrls] = useState('');
  const [opts, setOpts] = useState({ xml: true, html: false, txt: false, priority: true, lastmod: true, changefreq: true });
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [results, setResults] = useState(null);
  const [tab, setTab] = useState('xml');
  const [err, setErr] = useState('');
  const [langOpen, setLangOpen] = useState(false);
  const logRef = useRef(null);
  const langRef = useRef(null);

  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [logs]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggle = (k) => setOpts(p => ({ ...p, [k]: !p[k] }));

  const switchLang = (nextLocale) => {
    setLangOpen(false);
    router.push(router.pathname, router.asPath, { locale: nextLocale });
  };

  const generate = async () => {
    const lines = urls.split('\n').map(s => s.trim()).filter(Boolean);
    if (lines.length === 0) { setErr(tx.errEmpty); return; }
    for (const u of lines) {
      if (!u.match(/^https?:\/\/.+/)) { setErr(tx.errInvalid + ': ' + u); return; }
    }

    setLoading(true); setLogs([]); setResults(null); setErr('');

    try {
      const res = await fetch('/api/crawl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: lines }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || tx.errGeneric);

      setLogs(data.logs || []);
      if (data.total === 0) { setErr(tx.errNoResult); setLoading(false); return; }
      setResults(data);
    } catch (e) { setErr(e.message); }
    setLoading(false);
  };

  const buildXml = () => {
    if (!results || results.total === 0) return '';
    const today = new Date().toISOString().split('T')[0];
    let s = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    for (const item of results.urls) {
      const d = item.depth || 0;
      const pri = opts.priority ? (Math.max(0.1, 1.0 - d * 0.15)).toFixed(1) : '0.5';
      const freq = opts.changefreq ? (d === 0 ? 'daily' : d < 2 ? 'weekly' : 'monthly') : 'weekly';
      s += '  <url>\n';
      s += '    <loc>' + escapeXml(item.url) + '</loc>\n';
      if (opts.lastmod) s += '    <lastmod>' + today + '</lastmod>\n';
      if (opts.changefreq) s += '    <changefreq>' + freq + '</changefreq>\n';
      if (opts.priority) s += '    <priority>' + pri + '</priority>\n';
      s += '  </url>\n';
    }
    s += '</urlset>';
    return s;
  };

  const buildHtml = () => {
    if (!results || results.total === 0) return '';
    const domain = results.urls[0] ? new URL(results.urls[0].url).hostname : '';
    let s = '<!DOCTYPE html>\n<html lang="' + locale + '">\n<head>\n';
    s += '  <meta charset="UTF-8">\n';
    s += '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
    s += '  <title>Sitemap - ' + domain + '</title>\n';
    s += '  <style>body{font-family:system-ui,sans-serif;max-width:800px;margin:40px auto;padding:0 20px;color:#1e293b}h1{border-bottom:2px solid #e2e8f0;padding-bottom:12px}ul{list-style:none;padding:0}li{padding:10px 0;border-bottom:1px solid #f1f5f9}a{color:#4f46e5;text-decoration:none}</style>\n';
    s += '</head>\n<body>\n';
    s += '  <h1>Sitemap</h1>\n';
    s += '  <p>' + domain + '</p>\n';
    s += '  <ul>\n';
    for (const item of results.urls) {
      const path = new URL(item.url).pathname || '/';
      s += '    <li><a href="' + escapeXml(item.url) + '">' + escapeXml(path) + '</a></li>\n';
    }
    s += '  </ul>\n</body>\n</html>';
    return s;
  };

  const buildTxt = () => {
    if (!results || results.total === 0) return '';
    return results.urls.map(u => u.url).join('\n');
  };

  const download = (type) => {
    let content, filename, mime;
    if (type === 'xml') { content = buildXml(); filename = 'sitemap.xml'; mime = 'application/xml'; }
    else if (type === 'html') { content = buildHtml(); filename = 'sitemap.html'; mime = 'text/html'; }
    else { content = buildTxt(); filename = 'sitemap.txt'; mime = 'text/plain'; }
    if (!content) return;
    const blob = new Blob([content], { type: mime });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const copy = async (text) => { if (!text) return; await navigator.clipboard.writeText(text); };

  const xmlContent = buildXml();
  const htmlContent = buildHtml();

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const canonical = baseUrl + '/' + locale;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tx.siteName,
    description: tx.desc,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    url: baseUrl,
    inLanguage: locale === 'zh' ? 'zh-CN' : locale === 'ja' ? 'ja-JP' : locale === 'ko' ? 'ko-KR' : locale === 'de' ? 'de-DE' : locale === 'fr' ? 'fr-FR' : locale === 'es' ? 'es-ES' : 'en-US',
  };

  return (
    <>
      <Head>
        <title>{tx.title}</title>
        <meta name="description" content={tx.desc} />
        <meta name="keywords" content={tx.keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Sylveris" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="en" href={baseUrl + '/en'} />
        <link rel="alternate" hrefLang="zh" href={baseUrl + '/zh'} />
        <link rel="alternate" hrefLang="es" href={baseUrl + '/es'} />
        <link rel="alternate" hrefLang="fr" href={baseUrl + '/fr'} />
        <link rel="alternate" hrefLang="de" href={baseUrl + '/de'} />
        <link rel="alternate" hrefLang="ja" href={baseUrl + '/ja'} />
        <link rel="alternate" hrefLang="ko" href={baseUrl + '/ko'} />
        <link rel="alternate" hrefLang="x-default" href={baseUrl + '/en'} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Sylveris Sitemap" />
        <meta property="og:title" content={tx.title} />
        <meta property="og:description" content={tx.desc} />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content={locale === 'zh' ? 'zh_CN' : locale === 'ja' ? 'ja_JP' : locale === 'ko' ? 'ko_KR' : locale === 'de' ? 'de_DE' : locale === 'fr' ? 'fr_FR' : locale === 'es' ? 'es_ES' : 'en_US'} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={tx.title} />
        <meta name="twitter:description" content={tx.desc} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <style jsx global>{`
        :root { --bg:#f8fafc; --card:#ffffff; --text:#0f172a; --muted:#64748b; --border:#e2e8f0; --accent:#4f46e5; --accent-light:#eef2ff; --accent-hover:#4338ca; --danger:#dc2626; --danger-bg:#fef2f2; --success:#16a34a; --shadow:0 4px 6px -1px rgba(0,0,0,0.05),0 2px 4px -2px rgba(0,0,0,0.05); --shadow-lg:0 10px 15px -3px rgba(0,0,0,0.07),0 4px 6px -4px rgba(0,0,0,0.05); }
        * { margin:0;padding:0;box-sizing:border-box }
        body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; background:var(--bg); color:var(--text); line-height:1.6 }
        input:focus,textarea:focus,button:focus { outline:2px solid var(--accent); outline-offset:2px }
        a { color:var(--accent); text-decoration:none }
        a:hover { text-decoration:underline }
      `}</style>

      <header>
        <nav style={{ position:'fixed',top:0,left:0,right:0,zIndex:100,background:'rgba(255,255,255,0.95)',backdropFilter:'blur(12px)',borderBottom:'1px solid var(--border)' }}>
          <div style={{ maxWidth:1200,margin:'0 auto',padding:'0 1.5rem',height:64,display:'flex',alignItems:'center',justifyContent:'space-between' }}>
            <a href="#" style={{ display:'flex',alignItems:'center',gap:10,fontWeight:800,fontSize:'1.125rem',color:'var(--text)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              <span><span style={{ background:'linear-gradient(135deg,#4f46e5,#7c3aed)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>Sylveris</span> Sitemap</span>
            </a>
            <div style={{ display:'flex',alignItems:'center',gap:'1.5rem' }}>
              <a href="#tool" style={{ color:'var(--muted)',fontSize:'0.875rem',fontWeight:500 }}>{tx.navTool}</a>
              <a href="#features" style={{ color:'var(--muted)',fontSize:'0.875rem',fontWeight:500 }}>{tx.navFeatures}</a>
              <a href="#guide" style={{ color:'var(--muted)',fontSize:'0.875rem',fontWeight:500 }}>{tx.navGuide}</a>

              {/* 语言切换图标按钮 */}
              <div ref={langRef} style={{ position:'relative' }}>
                <button
                  onClick={() => setLangOpen(v => !v)}
                  style={{ background:'var(--accent-light)',color:'var(--accent)',border:'none',borderRadius:8,padding:'0.5rem',fontSize:'1.25rem',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',width:36,height:36 }}
                  title={tx.langSwitch}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </button>
                {langOpen && (
                  <div style={{ position:'absolute',top:44,right:0,background:'white',border:'1px solid var(--border)',borderRadius:10,boxShadow:'var(--shadow-lg)',padding:'0.5rem 0',minWidth:160,zIndex:200 }}>
                    {Object.entries(localeMeta).map(([code, meta]) => (
                      <button
                        key={code}
                        onClick={() => switchLang(code)}
                        style={{ display:'flex',alignItems:'center',gap:8,width:'100%',padding:'0.5rem 1rem',border:'none',background:code===locale?'var(--accent-light)':'transparent',color:code===locale?'var(--accent)':'var(--text)',fontSize:'0.875rem',fontWeight:code===locale?600:400,cursor:'pointer',textAlign:'left',whiteSpace:'nowrap' }}
                      >
                        <span style={{ fontSize:'1rem' }}>{meta.flag}</span>
                        <span>{meta.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section style={{ position:'relative',padding:'140px 1.5rem 80px',background:'linear-gradient(180deg,#ffffff 0%,#f8fafc 100%)',borderBottom:'1px solid var(--border)' }}>
          <div style={{ maxWidth:1200,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'3rem',alignItems:'center' }}>
            <div>
              <div style={{ display:'inline-flex',alignItems:'center',gap:6,background:'var(--accent-light)',color:'var(--accent)',padding:'0.375rem 0.875rem',borderRadius:100,fontSize:'0.875rem',fontWeight:600,marginBottom:'1.5rem' }}>
                <span style={{ width:6,height:6,background:'var(--accent)',borderRadius:'50%' }} />
                {tx.heroBadge}
              </div>
              <h1 style={{ fontSize:'clamp(2.5rem,4vw,3.5rem)',fontWeight:800,lineHeight:1.15,letterSpacing:'-0.02em',marginBottom:'1rem' }}>
                {tx.heroTitle1}<br/><span style={{ background:'linear-gradient(135deg,#4f46e5,#7c3aed)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>{tx.heroTitle2}</span>
              </h1>
              <p style={{ fontSize:'1.125rem',color:'var(--muted)',lineHeight:1.7,maxWidth:480 }}>{tx.heroDesc}</p>
            </div>
            <div style={{ display:'flex',justifyContent:'center' }}>
              <div style={{ width:320,height:320,background:'var(--accent-light)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',position:'relative' }}>
                <div style={{ width:240,height:240,background:'white',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'var(--shadow-lg)' }}>
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="tool" style={{ padding:'60px 1.5rem',maxWidth:900,margin:'0 auto' }}>
          <div style={{ textAlign:'center',marginBottom:'2rem' }}>
            <h2 style={{ fontSize:'1.75rem',fontWeight:700,marginBottom:'0.5rem' }}>{tx.toolTitle}</h2>
            <p style={{ color:'var(--muted)' }}>{tx.toolDesc}</p>
          </div>
          <div style={{ background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:'2rem',boxShadow:'var(--shadow)' }}>
            <label style={{ display:'block',fontSize:'0.875rem',fontWeight:600,marginBottom:'0.5rem' }}>{tx.urlLabel}</label>
            <textarea
              value={urls}
              onChange={e => setUrls(e.target.value)}
              placeholder={tx.urlPlaceholder}
              rows={4}
              style={{ width:'100%',padding:'0.875rem 1rem',border:'1px solid var(--border)',borderRadius:10,fontSize:'0.9375rem',fontFamily:'inherit',resize:'vertical',marginBottom:'1.25rem' }}
            />

            <div style={{ marginBottom:'0.75rem',fontSize:'0.875rem',fontWeight:600 }}>{tx.formatTitle}</div>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0.75rem',marginBottom:'1.25rem' }}>
              {[
                {k:'xml',t:tx.formatXml,d:tx.formatXmlDesc},
                {k:'html',t:tx.formatHtml,d:tx.formatHtmlDesc},
                {k:'txt',t:tx.formatTxt,d:tx.formatTxtDesc},
              ].map(o => (
                <div key={o.k} onClick={() => toggle(o.k)} style={{ border:'1px solid '+(opts[o.k]?'var(--accent)':'var(--border)'),borderRadius:10,padding:'1rem',cursor:'pointer',background:opts[o.k]?'var(--accent-light)':'var(--card)',transition:'all 0.2s' }}>
                  <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:4 }}>
                    <span style={{ fontWeight:600,fontSize:'0.875rem' }}>{o.t}</span>
                    <div style={{ width:18,height:18,border:'2px solid '+(opts[o.k]?'var(--accent)':'var(--border)'),borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center',background:opts[o.k]?'var(--accent)':'transparent' }}>
                      {opts[o.k] && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                    </div>
                  </div>
                  <p style={{ fontSize:'0.75rem',color:'var(--muted)' }}>{o.d}</p>
                </div>
              ))}
            </div>

            <div style={{ marginBottom:'0.75rem',fontSize:'0.875rem',fontWeight:600 }}>{tx.seoTitle}</div>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0.75rem',marginBottom:'1.5rem' }}>
              {[
                {k:'priority',t:tx.seoPriority,d:tx.seoPriorityDesc},
                {k:'lastmod',t:tx.seoLastmod,d:tx.seoLastmodDesc},
                {k:'changefreq',t:tx.seoChangefreq,d:tx.seoChangefreqDesc},
              ].map(o => (
                <div key={o.k} onClick={() => toggle(o.k)} style={{ border:'1px solid '+(opts[o.k]?'var(--accent)':'var(--border)'),borderRadius:10,padding:'1rem',cursor:'pointer',background:opts[o.k]?'var(--accent-light)':'var(--card)',transition:'all 0.2s' }}>
                  <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between' }}>
                    <span style={{ fontWeight:600,fontSize:'0.875rem' }}>{o.t}</span>
                    <div style={{ width:18,height:18,border:'2px solid '+(opts[o.k]?'var(--accent)':'var(--border)'),borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center',background:opts[o.k]?'var(--accent)':'transparent' }}>
                      {opts[o.k] && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                    </div>
                  </div>
                  <p style={{ fontSize:'0.75rem',color:'var(--muted)',marginTop:4 }}>{o.d}</p>
                </div>
              ))}
            </div>

            <button
              onClick={generate}
              disabled={loading}
              style={{ width:'100%',padding:'0.875rem',background:'var(--accent)',color:'white',border:'none',borderRadius:10,fontSize:'1rem',fontWeight:600,cursor:loading?'not-allowed':'pointer',opacity:loading?0.7:1,transition:'all 0.2s',display:'flex',alignItems:'center',justifyContent:'center',gap:8 }}
            >
              {loading ? (
                <><span style={{ width:18,height:18,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'white',borderRadius:'50%',animation:'spin 0.8s linear infinite',display:'inline-block' }} />{tx.btnGenerating}</>
              ) : tx.btnGenerate}
            </button>

            {err && <div style={{ marginTop:'1rem',padding:'0.875rem 1rem',background:'var(--danger-bg)',border:'1px solid #fecaca',borderRadius:8,color:'var(--danger)',fontSize:'0.875rem' }}>{err}</div>}

            {logs.length > 0 && (
              <div style={{ marginTop:'1rem',padding:'1rem',background:'#f1f5f9',borderRadius:8,fontFamily:'monospace',fontSize:'0.75rem',color:'var(--muted)',maxHeight:160,overflowY:'auto' }} ref={logRef}>
                {logs.map((l,i) => <div key={i}>{l}</div>)}
              </div>
            )}

            {results && results.total > 0 && (
              <div style={{ marginTop:'1.5rem' }}>
                <div style={{ display:'flex',gap:'0.5rem',marginBottom:'1rem',borderBottom:'1px solid var(--border)',paddingBottom:'0.5rem' }}>
                  {['xml','urls','html'].map(tk => (
                    <button key={tk} onClick={() => setTab(tk)} style={{ padding:'0.5rem 1rem',borderRadius:6,border:'none',background:tab===tk?'var(--accent-light)':'transparent',color:tab===tk?'var(--accent)':'var(--muted)',fontWeight:500,cursor:'pointer',fontSize:'0.875rem' }}>
                      {tk==='xml'?tx.resultXml:tk==='urls'?tx.resultUrls:tx.resultHtml}
                    </button>
                  ))}
                </div>

                {tab==='xml' && xmlContent && (
                  <div style={{ border:'1px solid var(--border)',borderRadius:10,overflow:'hidden' }}>
                    <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0.625rem 1rem',background:'#f8fafc',borderBottom:'1px solid var(--border)' }}>
                      <span style={{ fontSize:'0.75rem',fontWeight:600,color:'var(--muted)' }}>sitemap.xml</span>
                      <div style={{ display:'flex',gap:8 }}>
                        <button onClick={() => copy(xmlContent)} style={{ padding:'0.25rem 0.625rem',borderRadius:4,fontSize:'0.75rem',border:'1px solid var(--border)',background:'white',cursor:'pointer' }}>{tx.btnCopy}</button>
                        <button onClick={() => download('xml')} style={{ padding:'0.25rem 0.625rem',borderRadius:4,fontSize:'0.75rem',border:'1px solid var(--accent)',background:'var(--accent)',color:'white',cursor:'pointer' }}>{tx.btnDownloadXml}</button>
                      </div>
                    </div>
                    <pre style={{ padding:'1rem',fontFamily:'monospace',fontSize:'0.8125rem',lineHeight:1.6,color:'var(--muted)',maxHeight:360,overflowY:'auto',whiteSpace:'pre-wrap',wordBreak:'break-all' }}>{xmlContent}</pre>
                  </div>
                )}

                {tab==='urls' && results.urls.length > 0 && (
                  <div style={{ border:'1px solid var(--border)',borderRadius:10,overflow:'hidden' }}>
                    <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0.625rem 1rem',background:'#f8fafc',borderBottom:'1px solid var(--border)' }}>
                      <span style={{ fontSize:'0.75rem',fontWeight:600,color:'var(--muted)' }}>{results.total} {tx.logUrls}</span>
                      <button onClick={() => download('txt')} style={{ padding:'0.25rem 0.625rem',borderRadius:4,fontSize:'0.75rem',border:'1px solid var(--accent)',background:'var(--accent)',color:'white',cursor:'pointer' }}>{tx.btnDownloadTxt}</button>
                    </div>
                    <div style={{ maxHeight:360,overflowY:'auto' }}>
                      {results.urls.map((item,i) => (
                        <div key={i} style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0.625rem 1rem',borderBottom:'1px solid var(--border)',fontSize:'0.875rem' }}>
                          <span style={{ whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',flex:1 }}>{item.url}</span>
                          <span style={{ fontSize:'0.75rem',color:'var(--muted)',background:'#f1f5f9',padding:'0.125rem 0.5rem',borderRadius:4,marginLeft:'0.75rem',flexShrink:0 }}>depth:{item.depth}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tab==='html' && htmlContent && (
                  <div style={{ border:'1px solid var(--border)',borderRadius:10,overflow:'hidden' }}>
                    <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0.625rem 1rem',background:'#f8fafc',borderBottom:'1px solid var(--border)' }}>
                      <span style={{ fontSize:'0.75rem',fontWeight:600,color:'var(--muted)' }}>sitemap.html</span>
                      <div style={{ display:'flex',gap:8 }}>
                        <button onClick={() => copy(htmlContent)} style={{ padding:'0.25rem 0.625rem',borderRadius:4,fontSize:'0.75rem',border:'1px solid var(--border)',background:'white',cursor:'pointer' }}>{tx.btnCopy}</button>
                        <button onClick={() => download('html')} style={{ padding:'0.25rem 0.625rem',borderRadius:4,fontSize:'0.75rem',border:'1px solid var(--accent)',background:'var(--accent)',color:'white',cursor:'pointer' }}>{tx.btnDownloadHtml}</button>
                      </div>
                    </div>
                    <pre style={{ padding:'1rem',fontFamily:'monospace',fontSize:'0.8125rem',lineHeight:1.6,color:'var(--muted)',maxHeight:360,overflowY:'auto',whiteSpace:'pre-wrap',wordBreak:'break-all' }}>{htmlContent}</pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <section id="features" style={{ padding:'60px 1.5rem',background:'white',borderTop:'1px solid var(--border)' }}>
          <div style={{ maxWidth:1200,margin:'0 auto' }}>
            <div style={{ textAlign:'center',marginBottom:'3rem' }}>
              <h2 style={{ fontSize:'1.75rem',fontWeight:700,marginBottom:'0.5rem' }}>{tx.featuresTitle}</h2>
              <p style={{ color:'var(--muted)' }}>{tx.featuresDesc}</p>
            </div>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.5rem' }}>
              {[
                {icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,t:tx.feat1Title,d:tx.feat1Desc},
                {icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,t:tx.feat2Title,d:tx.feat2Desc},
                {icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,t:tx.feat3Title,d:tx.feat3Desc},
                {icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,t:tx.feat4Title,d:tx.feat4Desc},
                {icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,t:tx.feat5Title,d:tx.feat5Desc},
                {icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,t:tx.feat6Title,d:tx.feat6Desc},
              ].map((f,i) => (
                <div key={i} style={{ background:'var(--bg)',border:'1px solid var(--border)',borderRadius:12,padding:'1.5rem',transition:'all 0.2s',cursor:'default' }}
                  onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='var(--shadow-lg)'}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none'}}
                >
                  <div style={{ width:40,height:40,background:'var(--accent-light)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--accent)',marginBottom:'0.875rem' }}>{f.icon}</div>
                  <h3 style={{ fontSize:'1rem',fontWeight:700,marginBottom:'0.375rem' }}>{f.t}</h3>
                  <p style={{ fontSize:'0.875rem',color:'var(--muted)',lineHeight:1.6 }}>{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="guide" style={{ padding:'60px 1.5rem',background:'var(--bg)' }}>
          <div style={{ maxWidth:1200,margin:'0 auto' }}>
            <div style={{ textAlign:'center',marginBottom:'3rem' }}>
              <h2 style={{ fontSize:'1.75rem',fontWeight:700,marginBottom:'0.5rem' }}>{tx.guideTitle}</h2>
              <p style={{ color:'var(--muted)' }}>{tx.guideDesc}</p>
            </div>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'2rem' }}>
              {[
                {n:'1',t:tx.step1Title,d:tx.step1Desc},
                {n:'2',t:tx.step2Title,d:tx.step2Desc},
                {n:'3',t:tx.step3Title,d:tx.step3Desc},
              ].map((s,i) => (
                <div key={i} style={{ textAlign:'center',position:'relative' }}>
                  <div style={{ width:48,height:48,background:'var(--accent)',color:'white',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.25rem',fontWeight:700,margin:'0 auto 1rem' }}>{s.n}</div>
                  {i < 2 && <div style={{ position:'absolute',top:24,right:'-1rem',width:'2rem',height:2,background:'var(--border)' }} />}
                  <h3 style={{ fontSize:'1rem',fontWeight:700,marginBottom:'0.375rem' }}>{s.t}</h3>
                  <p style={{ fontSize:'0.875rem',color:'var(--muted)',lineHeight:1.6 }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding:'60px 1.5rem',background:'white',borderTop:'1px solid var(--border)' }}>
          <div style={{ maxWidth:720,margin:'0 auto' }}>
            <h2 style={{ fontSize:'1.25rem',fontWeight:700,marginBottom:'0.75rem' }}>{tx.aboutTitle}</h2>
            <p style={{ color:'var(--muted)',fontSize:'0.9375rem',lineHeight:1.7,marginBottom:'0.75rem' }}>{tx.aboutDesc1}</p>
            <p style={{ color:'var(--muted)',fontSize:'0.9375rem',lineHeight:1.7 }}>{tx.aboutDesc2}</p>
          </div>
        </section>
      </main>

      <footer style={{ borderTop:'1px solid var(--border)',padding:'1.5rem',textAlign:'center',color:'var(--muted)',fontSize:'0.875rem',background:'var(--bg)' }}>
        {tx.footer}
      </footer>

      <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
