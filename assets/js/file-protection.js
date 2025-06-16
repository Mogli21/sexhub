(function() {
    const fileProtection = {
        originalContent: null,
        fileName: null,
        checksum: null,

        init(fileName) {
            this.fileName = fileName;
            this.originalContent = document.currentScript.innerHTML;
            this.checksum = this.generateChecksum(this.originalContent);
            this.startMonitoring();
        },

        generateChecksum(str) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
            return hash.toString(36);
        },

        startMonitoring() {
            // Verifica modificações a cada segundo
            setInterval(() => {
                const currentContent = document.currentScript.innerHTML;
                const currentChecksum = this.generateChecksum(currentContent);

                if (currentChecksum !== this.checksum) {
                    console.error(`Tentativa de modificação detectada em ${this.fileName}`);
                    window.location.href = 'error.html';
                }
            }, 1000);

            // Previne edição via console
            Object.defineProperty(document.currentScript, 'innerHTML', {
                get: function() {
                    return this.originalContent;
                },
                set: function() {
                    console.error(`Tentativa de modificação bloqueada em ${this.fileName}`);
                    window.location.href = 'error.html';
                    return false;
                }
            });
        }
    };

    // Inicializa a proteção
    fileProtection.init(document.currentScript.src);
})(); 