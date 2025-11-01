#!/usr/bin/env python3
"""
Servidor HTTP simples para desenvolvimento local
Compatível com Python 3.x

Uso:
    python3 server.py

Depois acesse: http://localhost:8000
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Configurações
PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Handler customizado para servir arquivos do diretório atual"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        """Adicionar headers para evitar cache"""
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def log_message(self, format, *args):
        """Customizar mensagens de log"""
        print(f"[{self.log_date_time_string()}] {format % args}")

def main():
    """Iniciar o servidor"""
    print("=" * 70)
    print("SERVIDOR HTTP LOCAL - PAPO DE HOMEM PARA HOMEM")
    print("=" * 70)
    print(f"\n📁 Diretório: {DIRECTORY}")
    print(f"🌐 URL: http://localhost:{PORT}")
    print(f"🛑 Para parar o servidor: Pressione Ctrl+C\n")
    
    try:
        with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
            print(f"✓ Servidor iniciado em http://localhost:{PORT}")
            print("✓ Abrindo navegador...\n")
            
            # Tentar abrir o navegador automaticamente
            try:
                webbrowser.open(f"http://localhost:{PORT}")
            except Exception as e:
                print(f"⚠️  Não foi possível abrir o navegador automaticamente: {e}")
                print(f"   Abra manualmente: http://localhost:{PORT}\n")
            
            httpd.serve_forever()
    
    except KeyboardInterrupt:
        print("\n\n✓ Servidor encerrado pelo usuário")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"\n❌ Erro: A porta {PORT} já está em uso")
            print("   Tente uma porta diferente ou feche o programa que está usando a porta")
        else:
            print(f"\n❌ Erro: {e}")
    except Exception as e:
        print(f"\n❌ Erro inesperado: {e}")

if __name__ == "__main__":
    main()

