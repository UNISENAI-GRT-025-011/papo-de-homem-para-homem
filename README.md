> [!WARNING]
> Esse README foi gerado automaticamente no início e não condiz mais com o estado atual do código.

# Papo de Homem para Homem - Website

Um website responsivo e acessível criado com **HTML, CSS e JavaScript puro** (sem dependências externas). Desenvolvido com princípios **SOLID** e **Clean Code**.

## 📋 Características

- ✅ **HTML Semântico**: Estrutura clara e acessível
- ✅ **CSS Responsivo**: Mobile-first com breakpoints definidos
- ✅ **JavaScript Vanilla**: Sem frameworks ou bibliotecas externas
- ✅ **SOLID Principles**: Código bem estruturado e manutenível
- ✅ **Acessibilidade**: ARIA labels e navegação por teclado
- ✅ **Performance**: Otimizado para carregamento rápido
- ✅ **Cross-browser**: Compatível com navegadores modernos

## 🚀 Como Usar

### Opção 1: Abrir Diretamente no Navegador

1. Extraia o arquivo ZIP
2. Abra o arquivo `index.html` em seu navegador preferido
3. Pronto! O website está funcionando

```bash
# Exemplo no Windows
# Clique duas vezes em index.html

# Exemplo no macOS/Linux
open index.html
# ou
firefox index.html
```

### Opção 2: Usar um Servidor Local (Recomendado)

Se você tiver Python instalado:

```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```

Se você tiver Node.js instalado:

```bash
# Usando http-server
npx http-server

# Usando live-server
npx live-server
```

Depois, acesse `http://localhost:8000` no seu navegador.

## 📁 Estrutura do Projeto

```
website-puro/
├── index.html          # Arquivo HTML principal
├── css/
│   └── styles.css      # Estilos CSS responsivos
├── js/
│   └── main.js         # JavaScript com padrão SOLID
├── assets/             # Imagens e ícones
│   ├── 88-2.webp
│   ├── 88-711.svg
│   ├── 110-6.webp
│   ├── 213-129.webp
│   ├── 213-131.webp
│   ├── 261-56.svg
│   └── ... (outros ativos)
└── README.md           # Este arquivo
```

## 🎨 Personalização

### Alterar Cores

Abra `css/styles.css` e modifique as variáveis CSS no início do arquivo:

```css
:root {
  --color-primary: #353e4f;
  --color-accent: #f9cc52;
  /* ... outras cores ... */
}
```

### Alterar Conteúdo

Edite o arquivo `index.html` e modifique o texto diretamente nas tags HTML.

### Adicionar Novas Seções

1. Adicione a seção HTML em `index.html`
2. Crie os estilos em `css/styles.css`
3. Se necessário, adicione funcionalidades em `js/main.js`

## 🏗️ Arquitetura SOLID

O arquivo `js/main.js` implementa os cinco princípios SOLID:

### Single Responsibility Principle
- `SearchManager`: Gerencia pesquisa
- `NavigationManager`: Gerencia navegação
- `ResponsiveManager`: Gerencia responsividade
- `AccessibilityManager`: Gerencia acessibilidade
- `PerformanceMonitor`: Monitora performance

### Open/Closed Principle
- Cada classe pode ser estendida sem modificar o código existente

### Liskov Substitution Principle
- Todos os managers podem ser substituídos por implementações diferentes

### Interface Segregation Principle
- Cada classe tem uma interface específica e bem definida

### Dependency Inversion Principle
- A classe `Application` depende de abstrações (managers)

## ♿ Acessibilidade

O website implementa:

- ✅ Navegação por teclado (Tab, Enter, Escape)
- ✅ ARIA labels em elementos interativos
- ✅ Contraste de cores adequado
- ✅ Textos alternativos em imagens
- ✅ Estrutura semântica HTML

## 📱 Responsividade

O website é otimizado para:

- 📱 Mobile (até 480px)
- 📱 Tablet (481px a 768px)
- 🖥️ Desktop (acima de 768px)

## 🔍 Funcionalidades JavaScript

### SearchManager
- Pesquisa ao pressionar Enter
- Validação de entrada

### NavigationManager
- Navegação suave entre seções
- Suporte a links internos (#id)

### ResponsiveManager
- Detecção automática de breakpoints
- Callbacks para mudanças de tamanho

### AccessibilityManager
- Navegação por teclado
- Verificação de ARIA labels

### PerformanceMonitor
- Monitoramento de tempo de carregamento
- Lazy loading de imagens (futuro)

## 🐛 Troubleshooting

### As imagens não aparecem
- Verifique se a pasta `assets/` está no mesmo diretório que `index.html`
- Verifique os caminhos das imagens em `index.html`

### Os estilos não carregam
- Verifique se a pasta `css/` está no mesmo diretório que `index.html`
- Limpe o cache do navegador (Ctrl+Shift+Delete)

### O JavaScript não funciona
- Abra o console do navegador (F12) e procure por erros
- Verifique se `js/main.js` está no caminho correto

## 📝 Licença

Este projeto é fornecido como está, sem garantias.

## 👨‍💼 Autor

Desenvolvido pela Polícia Judiciária Civil do Estado de Mato Grosso.

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato através do website.

---

**Versão**: 1.0.0  
**Última atualização**: Outubro de 2025  
**Compatibilidade**: Todos os navegadores modernos (Chrome, Firefox, Safari, Edge)

