/**
 * ============================================================================
 * APLICAÇÃO PRINCIPAL - PAPO DE HOMEM PARA HOMEM
 * ============================================================================
 * 
 * Arquitetura: SOLID Principles
 * - Single Responsibility: Cada classe tem uma única responsabilidade
 * - Open/Closed: Aberto para extensão, fechado para modificação
 * - Liskov Substitution: Subclasses podem substituir suas classes base
 * - Interface Segregation: Interfaces específicas para cada cliente
 * - Dependency Inversion: Depender de abstrações, não de implementações
 */

// ============================================================================
// CLASSE: SearchManager
// Responsabilidade: Gerenciar a funcionalidade de pesquisa
// ============================================================================

class SearchManager {
  constructor(inputSelector) {
    this.searchInput = document.querySelector(inputSelector);
    this.init();
  }

  init() {
    if (this.searchInput) {
      this.searchInput.addEventListener('keypress', (event) => {
        this.handleSearch(event);
      });
    }
  }

  handleSearch(event) {
    if (event.key === 'Enter') {
      const query = this.searchInput.value.trim();
      if (query) {
        this.performSearch(query);
      }
    }
  }

  performSearch(query) {
    console.log(`Pesquisando por: ${query}`);
    // Implementação futura de pesquisa
    alert(`Você pesquisou por: ${query}`);
  }
}

// ============================================================================
// CLASSE: NavigationManager
// Responsabilidade: Gerenciar a navegação e scroll suave
// ============================================================================

class NavigationManager {
  constructor(navSelector) {
    this.navLinks = document.querySelectorAll(`${navSelector} a`);
    this.init();
  }

  init() {
    this.navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        this.handleNavigation(event);
      });
    });
  }

  handleNavigation(event) {
    const href = event.currentTarget.getAttribute('href');
    
    if (href.startsWith('#')) {
      event.preventDefault();
      this.scrollToSection(href);
    }
  }

  scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

// ============================================================================
// CLASSE: ResponsiveManager
// Responsabilidade: Gerenciar comportamentos responsivos
// ============================================================================

class ResponsiveManager {
  constructor() {
    this.breakpoints = {
      mobile: 480,
      tablet: 768,
      desktop: 1024,
    };
    this.currentBreakpoint = this.getCurrentBreakpoint();
    this.init();
  }

  init() {
    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  getCurrentBreakpoint() {
    const width = window.innerWidth;
    if (width <= this.breakpoints.mobile) return 'mobile';
    if (width <= this.breakpoints.tablet) return 'tablet';
    return 'desktop';
  }

  handleResize() {
    const newBreakpoint = this.getCurrentBreakpoint();
    if (newBreakpoint !== this.currentBreakpoint) {
      this.currentBreakpoint = newBreakpoint;
      this.onBreakpointChange(newBreakpoint);
    }
  }

  onBreakpointChange(breakpoint) {
    console.log(`Breakpoint alterado para: ${breakpoint}`);
    // Implementação de comportamentos específicos por breakpoint
  }

  isMobile() {
    return this.currentBreakpoint === 'mobile';
  }

  isTablet() {
    return this.currentBreakpoint === 'tablet';
  }

  isDesktop() {
    return this.currentBreakpoint === 'desktop';
  }
}

// ============================================================================
// CLASSE: AccessibilityManager
// Responsabilidade: Gerenciar acessibilidade
// ============================================================================

class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupAriaLabels();
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
      // ESC para fechar modais (implementação futura)
      if (event.key === 'Escape') {
        this.handleEscapeKey();
      }
      
      // Tab para navegação
      if (event.key === 'Tab') {
        this.handleTabKey();
      }
    });
  }

  setupAriaLabels() {
    // Verificar se todos os elementos interativos têm aria-label
    const interactiveElements = document.querySelectorAll('button, a, input');
    interactiveElements.forEach((element) => {
      if (!element.getAttribute('aria-label') && !element.textContent.trim()) {
        console.warn('Elemento sem aria-label:', element);
      }
    });
  }

  handleEscapeKey() {
    console.log('Tecla ESC pressionada');
  }

  handleTabKey() {
    // Implementação de navegação por Tab
  }
}

// ============================================================================
// CLASSE: PerformanceMonitor
// Responsabilidade: Monitorar performance
// ============================================================================

class PerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    this.logPageLoadTime();
    this.setupLazyLoading();
  }

  logPageLoadTime() {
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log(`Página carregada em ${loadTime.toFixed(2)}ms`);
    });
  }

  setupLazyLoading() {
    // Implementação de lazy loading para imagens
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach((img) => {
        imageObserver.observe(img);
      });
    }
  }
}

// ============================================================================
// CLASSE: Application
// Responsabilidade: Orquestrar todos os managers
// ============================================================================

class Application {
  constructor() {
    this.managers = [];
    this.init();
  }

  init() {
    this.initializeManagers();
    this.setupEventListeners();
    this.logInitialization();
  }

  initializeManagers() {
    // Inicializar todos os managers
    this.searchManager = new SearchManager('#searchInput');
    this.navigationManager = new NavigationManager('.nav-list');
    this.responsiveManager = new ResponsiveManager();
    this.accessibilityManager = new AccessibilityManager();
    this.performanceMonitor = new PerformanceMonitor();

    this.managers = [
      this.searchManager,
      this.navigationManager,
      this.responsiveManager,
      this.accessibilityManager,
      this.performanceMonitor,
    ];
  }

  setupEventListeners() {
    // Setup de event listeners globais
    document.addEventListener('DOMContentLoaded', () => {
      this.onDOMReady();
    });
  }

  onDOMReady() {
    console.log('DOM pronto para interação');
  }

  logInitialization() {
    console.log('✓ Aplicação inicializada com sucesso');
    console.log(`✓ ${this.managers.length} managers carregados`);
  }
}

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

// Aguardar o carregamento do DOM antes de inicializar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.app = new Application();
  });
} else {
  window.app = new Application();
}

