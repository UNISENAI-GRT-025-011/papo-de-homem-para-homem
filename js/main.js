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

class GerenciadorDeBusca {
  constructor(seletorInput) {
    this.campoBusca = document.querySelector(seletorInput);
    this.inicializar();
  }

  inicializar() {
    if (!this.campoBusca) return;

    this.campoBusca.addEventListener('keypress', (evento) => {
      if (evento.key === 'Enter') this.executarBusca();
    });
  }

  executarBusca() {
    const termo = this.campoBusca.value.trim();
    if (!termo) return;

    console.log(`Pesquisando por: ${termo}`);
    alert(`Você pesquisou por: ${termo}`);
  }
}

// ============================================================================
// CLASSE: NavigationManager
// Responsabilidade: Gerenciar a navegação e scroll suave
// ============================================================================

class GerenciadordeNavegacao {
  constructor(seletorNav) {
    this.linksNavegacao = document.querySelectorAll(`${seletorNav} a`);
    this.inicializar();
  }

  inicializar() {
    this.linksNavegacao.forEach((link) => {
        link.addEventListener('click', (event) => {  this.tratarNavegacao(event);
      });
    });
  }

  tratarNavegacao(event) {
    const destino = event.currentTarget.getAttribute('href');

    if (!destino.startsWith('#')) return;

    event.preventDefault();
    this.rolarParaSecao(destino);
  }

  rolarParaSecao(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}



