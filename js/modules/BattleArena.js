/* ==========================================
   BATTLE ARENA - Arena de Batalha Animada
   Personagem vs Inimigo com animações 
   walk e attack em loop
   ========================================== */

export class BattleArena {
    constructor() {
        this.container = document.querySelector('.battle-arena-stage');
        if (!this.container) return;
        
        // Configuração dos personagens e inimigos
        this.characters = {
            Juiz: {
                name: 'JUIZ',
                folder: 'personagens/Juiz',
                walkFrames: ['walk0.png', 'walk1.png', 'walk2.png'],
                attackFrames: ['atack2_0.png', 'atack2_1.png', 'atack2_2.png', 'atack2_3.png']
            },
            Coveiro: {
                name: 'COVEIRO',
                folder: 'personagens/Coveiro',
                walkFrames: ['walk0.png', 'walk1.png', 'walk2.png'],
                attackFrames: ['atack0.png', 'atack1.png', 'atack2.png', 'atack3.png']
            },
            Metalurgico: {
                name: 'METALÚRGICO',
                folder: 'personagens/Metalúrgico',
                walkFrames: ['walk0.png', 'walk1.png', 'walk2.png'],
                attackFrames: ['atack1.png', 'atack2_0.png', 'atack2.png']
            }
        };

        this.enemies = {
            Besta: {
                name: 'BESTA',
                folder: 'inimigos/Besta',
                walkFrames: ['BestaWalk0.png', 'BestaWalk1.png', 'BestaWalk2.png'],
                attackFrames: ['BestaAtack0.png', 'BestaAtack1.png', 'BestaAtack2.png', 'BestaAtack3.png', 'BestaAtack4.png']
            },
            Golen: {
                name: 'GOLEN',
                folder: 'inimigos/Golen',
                walkFrames: ['golemroxowalk0.png', 'golemroxowalk1.png', 'golemroxowalk2.png'],
                attackFrames: ['golemroxoatack0.png', 'golemroxoatack1.png', 'golemroxoatack2.png', 'golemroxoatack3.png']
            },
            Poluido: {
                name: 'POLUÍDO',
                folder: 'inimigos/Poluido',
                walkFrames: ['poluidowalk0.png', 'poluidowalk1.png', 'poluidowalk2.png'],
                attackFrames: ['poluido2atack0.png', 'poluido2atack1.png', 'poluido2atack2.png', 'poluido2atack3.png']
            }
        };

        // Mapeamento fixo: cada personagem enfrenta seu inimigo específico
        // Juiz(0) vs Besta(0), Coveiro(1) vs Golen(1), Metalurgico(2) vs Poluido(2)
        this.matches = [
            [0, 0], // Juiz vs Besta
            [1, 1], // Coveiro vs Golen
            [2, 2]  // Metalurgico vs Poluido
        ];

        this.charKeys = Object.keys(this.characters);
        this.enemyKeys = Object.keys(this.enemies);

        this.currentMatch = 0;
        this.currentCharacter = 0; // índice do personagem atual
        this.currentEnemy = 0;     // índice do inimigo atual (mapeado pelo match)
        this.isAnimating = false;
        this.animationTimer = null;
        this.phase = 'idle'; // idle, walking, attacking, knockback
        this.charFrames = [];
        this.enemyFrames = [];
        this.charCurrentFrame = 0;
        this.enemyCurrentFrame = 0;
        
        // Elementos DOM
        this.charSprite = this.container.querySelector('.fighter-sprite.character');
        this.enemySprite = this.container.querySelector('.fighter-sprite.enemy');
        this.titleEl = this.container.querySelector('.battle-title');
        this.subtitleEl = this.container.querySelector('.battle-subtitle');
        this.healthChar = this.container.querySelector('.health-bar.character .health-fill');
        this.healthEnemy = this.container.querySelector('.health-bar.enemy .health-fill');
        this.charNameEl = this.container.querySelector('.fighter-info.character .fighter-name');
        this.enemyNameEl = this.container.querySelector('.fighter-info.enemy .fighter-name');
        
        // Controles de personagem
        this.btnPrev = document.querySelector('.battle-btn-prev');
        this.btnNext = document.querySelector('.battle-btn-next');
        this.charIndicators = document.querySelectorAll('.char-indicator');

        // Botões de seleção direta
        this.btnChar0 = document.querySelector('.btn-char-0');
        this.btnChar1 = document.querySelector('.btn-char-1');
        this.btnChar2 = document.querySelector('.btn-char-2');

        this.init();
    }

    init() {
        // Iniciar com Juiz vs Besta
        this.setupMatch(0);
        this.startLoop();
        
        // Eventos dos botões de navegação
        if (this.btnPrev) {
            this.btnPrev.addEventListener('click', () => {
                this.prevCharacter();
            });
        }
        if (this.btnNext) {
            this.btnNext.addEventListener('click', () => {
                this.nextCharacter();
            });
        }

        // Botões de seleção direta de personagem
        if (this.btnChar0) {
            this.btnChar0.addEventListener('click', () => this.selectCharacter(0));
        }
        if (this.btnChar1) {
            this.btnChar1.addEventListener('click', () => this.selectCharacter(1));
        }
        if (this.btnChar2) {
            this.btnChar2.addEventListener('click', () => this.selectCharacter(2));
        }
    }

    selectCharacter(charIndex) {
        if (this.isAnimating) return;
        // Cada personagem tem seu inimigo fixo no mesmo índice (0=Besta, 1=Golen, 2=Poluido)
        if (charIndex >= 0 && charIndex < this.matches.length) {
            this.setupMatch(charIndex);
        }
    }

    prevCharacter() {
        if (this.isAnimating) return;
        // Vai para o personagem anterior (cíclico)
        const prev = ((this.currentCharacter - 1) + 3) % 3;
        this.setupMatch(prev);
    }

    nextCharacter() {
        if (this.isAnimating) return;
        // Vai para o próximo personagem (cíclico)
        const next = (this.currentCharacter + 1) % 3;
        this.setupMatch(next);
    }

    setupMatch(matchIndex) {
        this.currentMatch = matchIndex;
        const [charIdx, enemyIdx] = this.matches[matchIndex];
        this.currentCharacter = charIdx;
        this.currentEnemy = enemyIdx;

        const charKey = this.charKeys[charIdx];
        const enemyKey = this.enemyKeys[enemyIdx];
        const charData = this.characters[charKey];
        const enemyData = this.enemies[enemyKey];

        // Atualizar títulos
        if (this.titleEl) {
            this.titleEl.textContent = charData.name;
            this.titleEl.style.opacity = '0';
            setTimeout(() => { if (this.titleEl) this.titleEl.style.opacity = '1'; }, 50);
        }
        if (this.subtitleEl) {
            this.subtitleEl.textContent = `VS ${enemyData.name}`;
            this.subtitleEl.style.opacity = '0';
            setTimeout(() => { if (this.subtitleEl) this.subtitleEl.style.opacity = '1'; }, 150);
        }

        // Nomes dos lutadores
        if (this.charNameEl) this.charNameEl.textContent = charData.name;
        if (this.enemyNameEl) this.enemyNameEl.textContent = enemyData.name;

        // Atualizar indicadores
        if (this.charIndicators) {
            this.charIndicators.forEach((dot, i) => {
                dot.classList.toggle('active', i === charIdx);
            });
        }

        // Atualizar botões de personagem
        document.querySelectorAll('.btn-character').forEach((btn, i) => {
            btn.classList.toggle('active', i === charIdx);
        });

        // Resetar posições
        this.resetPositions();

        // Resetar health
        if (this.healthChar) this.healthChar.style.width = '100%';
        if (this.healthEnemy) this.healthEnemy.style.width = '100%';

        // Resetar estado
        this.phase = 'idle';
        this.charCurrentFrame = 0;
        this.enemyCurrentFrame = 0;
        
        // Carregar sprites iniciais
        this.loadCharFrames(charData, charKey);
        this.loadEnemyFrames(enemyData, enemyKey);
    }

    loadCharFrames(charData, charKey) {
        const base = 'imagens/';
        this.charFrames = { walk: [], attack: [] };
        
        // Walk frames
        charData.walkFrames.forEach(filename => {
            this.charFrames.walk.push(base + charData.folder + '/' + filename);
        });
        
        // Attack frames
        charData.attackFrames.forEach(filename => {
            this.charFrames.attack.push(base + charData.folder + '/' + filename);
        });

        // Setar frame inicial
        if (this.charSprite && this.charFrames.walk.length > 0) {
            this.charSprite.src = this.charFrames.walk[0];
        }
    }

    loadEnemyFrames(enemyData, enemyKey) {
        const base = 'imagens/';
        this.enemyFrames = { walk: [], attack: [] };
        
        // Walk frames
        enemyData.walkFrames.forEach(filename => {
            this.enemyFrames.walk.push(base + enemyData.folder + '/' + filename);
        });
        
        // Attack frames
        enemyData.attackFrames.forEach(filename => {
            this.enemyFrames.attack.push(base + enemyData.folder + '/' + filename);
        });

        // Setar frame inicial
        if (this.enemySprite && this.enemyFrames.walk.length > 0) {
            this.enemySprite.src = this.enemyFrames.walk[0];
        }
    }

    resetPositions() {
        if (!this.charSprite || !this.enemySprite) return;
        
        // Personagem começa na esquerda, inimigo na direita
        // A posição é controlada por CSS transforms via classes
        this.charSprite.parentElement.classList.remove('attacking', 'knockback', 'walking', 'walk-back');
        this.enemySprite.parentElement.classList.remove('attacking', 'knockback', 'walking', 'walk-back');
        
        // Resetar para posição inicial
        this.charSprite.parentElement.classList.add('position-start');
        this.enemySprite.parentElement.classList.add('position-start');
    }

    startLoop() {
        if (this.animationTimer) clearInterval(this.animationTimer);
        this.runSequence();
    }

    runSequence() {
        if (this.animationTimer) clearTimeout(this.animationTimer);
        
        const sequence = () => {
            if (!this.container) return;
            
            // 1. Walk towards each other
            this.phase = 'walking';
            this.animateWalk(() => {
                if (!this.container) return;
                // 2. Attack phase (both attack simultaneously)
                this.phase = 'attacking';
                this.animateAttack(() => {
                    if (!this.container) return;
                    // 3. Knockback phase (both fly back)
                    this.phase = 'knockback';
                    this.animateKnockback(() => {
                        if (!this.container) return;
                        // 4. Pequena pausa, depois repete
                        this.phase = 'idle';
                        this.animationTimer = setTimeout(() => {
                            if (this.container) this.runSequence();
                        }, 800);
                    });
                });
            });
        };

        // Pequeno delay inicial antes de começar
        this.animationTimer = setTimeout(sequence, 500);
    }

    animateWalk(callback) {
        const charContainer = this.charSprite.parentElement;
        const enemyContainer = this.enemySprite.parentElement;
        
        // Reset classes
        charContainer.classList.remove('position-start');
        enemyContainer.classList.remove('position-start');
        charContainer.classList.add('walking');
        enemyContainer.classList.add('walking');

        // Animar frames de walk
        let frame = 0;
        const frameRate = 180; // ms por frame
        const walkTime = this.charFrames.walk.length * frameRate + 200;

        const walkInterval = setInterval(() => {
            if (this.charFrames.walk.length > 0) {
                this.charSprite.src = this.charFrames.walk[frame % this.charFrames.walk.length];
            }
            if (this.enemyFrames.walk.length > 0) {
                this.enemySprite.src = this.enemyFrames.walk[frame % this.enemyFrames.walk.length];
            }
            frame++;
        }, frameRate);

        // Fim da caminhada
        setTimeout(() => {
            clearInterval(walkInterval);
            charContainer.classList.remove('walking');
            enemyContainer.classList.remove('walking');
            charContainer.classList.add('meet');
            enemyContainer.classList.add('meet');
            
            // Frame final de walk
            if (this.charFrames.walk.length > 0) {
                this.charSprite.src = this.charFrames.walk[this.charFrames.walk.length - 1];
            }
            if (this.enemyFrames.walk.length > 0) {
                this.enemySprite.src = this.enemyFrames.walk[this.enemyFrames.walk.length - 1];
            }

            setTimeout(callback, 300);
        }, walkTime);
    }

    animateAttack(callback) {
        const charContainer = this.charSprite.parentElement;
        const enemyContainer = this.enemySprite.parentElement;
        
        charContainer.classList.remove('meet');
        enemyContainer.classList.remove('meet');
        charContainer.classList.add('attacking');
        enemyContainer.classList.add('attacking');

        // Impact flash
        const impact = this.container.querySelector('.battle-impact');
        if (impact) {
            impact.classList.remove('active');
            void impact.offsetWidth;
            impact.classList.add('active');
        }

        // Animar frames de ataque (loop)
        let charFrame = 0;
        let enemyFrame = 0;
        const frameRate = 120;
        const attackTime = 600;

        const attackInterval = setInterval(() => {
            if (this.charFrames.attack.length > 0) {
                this.charSprite.src = this.charFrames.attack[charFrame % this.charFrames.attack.length];
                charFrame++;
            }
            if (this.enemyFrames.attack.length > 0) {
                this.enemySprite.src = this.enemyFrames.attack[enemyFrame % this.enemyFrames.attack.length];
                enemyFrame++;
            }
        }, frameRate);

        // Impact shake na tela
        this.container.classList.add('shaking');
        setTimeout(() => {
            this.container.classList.remove('shaking');
        }, 400);

        setTimeout(() => {
            clearInterval(attackInterval);
            charContainer.classList.remove('attacking');
            enemyContainer.classList.remove('attacking');
            
            if (impact) impact.classList.remove('active');

            // Último frame de ataque
            if (this.charFrames.attack.length > 0) {
                this.charSprite.src = this.charFrames.attack[this.charFrames.attack.length - 1];
            }
            if (this.enemyFrames.attack.length > 0) {
                this.enemySprite.src = this.enemyFrames.attack[this.enemyFrames.attack.length - 1];
            }

            // Diminuir health ligeiramente
            this.decreaseHealth();

            setTimeout(callback, 150);
        }, attackTime);
    }

    animateKnockback(callback) {
        const charContainer = this.charSprite.parentElement;
        const enemyContainer = this.enemySprite.parentElement;
        
        charContainer.classList.remove('meet');
        enemyContainer.classList.remove('meet');
        charContainer.classList.add('knockback');
        enemyContainer.classList.add('knockback');

        // Trocar para frames de walk na volta
        let frame = 0;
        const frameRate = 160;
        const knockTime = 500;

        const knockInterval = setInterval(() => {
            if (this.charFrames.walk.length > 0 && frame < this.charFrames.walk.length) {
                this.charSprite.src = this.charFrames.walk[frame];
            }
            if (this.enemyFrames.walk.length > 0 && frame < this.enemyFrames.walk.length) {
                this.enemySprite.src = this.enemyFrames.walk[frame];
            }
            frame++;
        }, frameRate);

        setTimeout(() => {
            clearInterval(knockInterval);
            charContainer.classList.remove('knockback');
            enemyContainer.classList.remove('knockback');
            charContainer.classList.add('position-start');
            enemyContainer.classList.add('position-start');

            // Frame inicial
            if (this.charFrames.walk.length > 0) {
                this.charSprite.src = this.charFrames.walk[0];
            }
            if (this.enemyFrames.walk.length > 0) {
                this.enemySprite.src = this.enemyFrames.walk[0];
            }

            setTimeout(callback, 300);
        }, knockTime);
    }

    decreaseHealth() {
        // Diminui um pouco a saúde de ambos
        const charHealth = this.healthChar;
        const enemyHealth = this.healthEnemy;
        if (charHealth) {
            const current = parseFloat(charHealth.style.width) || 100;
            const newVal = Math.max(0, current - 2);
            charHealth.style.width = newVal + '%';
        }
        if (enemyHealth) {
            const current = parseFloat(enemyHealth.style.width) || 100;
            const newVal = Math.max(0, current - 2);
            enemyHealth.style.width = newVal + '%';
        }
    }

    destroy() {
        if (this.animationTimer) {
            clearTimeout(this.animationTimer);
            this.animationTimer = null;
        }
    }
}