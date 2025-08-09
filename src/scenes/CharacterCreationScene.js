import Phaser from 'phaser';
import AvatarRenderer from '../objects/AvatarRenderer';
import { defaultPlayerData } from '../utils/playerData';

export default class CharacterCreationScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CharacterCreationScene' });
  }

  preload() {
    const layersPath = '/assets/characters/layers';
    this.load.atlas('body', `${layersPath}/body.png`, `${layersPath}/body.json`, {
      format: Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY
    });
    this.load.atlas('fx', `${layersPath}/fx.png`, `${layersPath}/fx.json`, {
      format: Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY
    });
    this.load.atlas('hair', `${layersPath}/hair.png`, `${layersPath}/hair.json`, {
      format: Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY
    });

    // UI Assets
    this.load.image({ key: 'parchment', url: 'assets/ui/parchment.png', noMipmap: true });
    this.load.image({ key: 'btn_base', url: 'assets/ui/btn_base.png', noMipmap: true });
    this.load.image({ key: 'goldSpark', url: 'assets/ui/goldSpark.png', noMipmap: true });
  }

  create() {
    const { width: W, height: H } = this.sys.game.config;
    // ---------- painel e cores ----------
    // cores padrão
    this.colors = { bg: 0x3a2f16, panel: 0x7a4e19, accent: 0xc9a64e, text: 0xf5f0e6, purple: 0x4c3370 };

    // estado inicial
    this.playerAvatarState = { ...defaultPlayerData };
    const panel = this.add
      .rectangle(W/2, H/2, W*0.8, H*0.85, 0x000000, 0.35)
      .setStrokeStyle(2, this.colors.accent)
      .setOrigin(0.5);

    // ---------- Renderizador do avatar (sem ainda posicionar) ----------
    this.avatarRenderer = new AvatarRenderer(this);
    const previewCanvas = document.getElementById('avatarView');
    if (previewCanvas) this.avatarRenderer.attachToCanvas(previewCanvas);

    // ---------- Criação dos objetos UI ----------  
    const title = this.add.text(0, 0, 'Criação de Personagem', {
      fontFamily: 'Cinzel', fontSize: '48px', color: `#${this.colors.accent.toString(16)}`
    }).setOrigin(0.5);

    const q1 = this.add.text(0, 0, 'Como desejas ser lembrado em tua jornada?', {
      fontFamily: 'Cardo', fontSize: '24px', color: `#${this.colors.text.toString(16)}`
    }).setOrigin(0.5);

    const nameInput = this.add.dom(0, 0).createElement('input', 'text')
      .setOrigin(0.5);
    nameInput.node.placeholder = 'Digite seu nome...';
    nameInput.node.style.cssText = `
      width:240px; height:32px;
      background:#0008; border:1px solid #${this.colors.accent.toString(16)};
      border-radius:5px; color:#${this.colors.text.toString(16)};
      font-family:Cardo; font-size:18px; text-align:center;`;

    // helper para criar linhas de botões
    const makeButtons = (labels, key, onClick) => {
      const containers = labels.map(lbl => {
        const bg = this.add.rectangle(0,0,110,34,this.colors.panel)
          .setStrokeStyle(2,this.colors.accent)
          .setInteractive({ useHandCursor: true })
          .on('pointerdown', () => onClick(lbl));
        const txt = this.add.text(0,0,lbl, {
          fontFamily:'Cardo', fontSize:'16px', color:`#${this.colors.text.toString(16)}`
        }).setOrigin(0.5);
        return this.add.container(0,0,[bg,txt]);
      });
      return containers;
    };

    // exemplos de botões
    const genderBtns = makeButtons(['Masculino','Feminino'],'gender',val=>{
      this.playerAvatarState.gender = val==='Masculino'?'masc':'fem';
    });
    const hairBtns   = makeButtons(['curto','medio','longo'],'hair',val=>{
      this.playerAvatarState.hair = val;
    });

    const qSkin = this.add.text(0, 0, 'Qual o tom de pele do teu Chamado?', {
      fontFamily: 'Cardo', fontSize: '24px', color: `#${this.colors.text.toString(16)}`
    }).setOrigin(0.5);

    const skinBtns = makeButtons(['Claro', 'Bronzeado', 'Marrom', 'Escuro'], 'skin', val => {
      let skinValue;
      switch (val) {
        case 'Claro': skinValue = 'light'; break;
        case 'Bronzeado': skinValue = 'tan'; break;
        case 'Marrom': skinValue = 'brown'; break;
        case 'Escuro': skinValue = 'dark'; break;
        default: skinValue = 'tan'; // default to tan
      }
      this.playerAvatarState.skin = skinValue;
    });

    // botão iniciar:
    const qBurden = this.add.text(0, 0, 'E qual é o peso que carregas desde o início?', {
      fontFamily: 'Cardo', fontSize: '24px', color: `#${this.colors.text.toString(16)}`
    }).setOrigin(0.5);

    const burdenOptions = [
      { label: 'Medo', value: 'fear', desc: 'A sombra que paralisa, a dúvida que corrói.' },
      { label: 'Dúvida', value: 'doubt', desc: 'A névoa que obscurece a verdade, a incerteza que enfraquece.' },
      { label: 'Orgulho', value: 'pride', desc: 'A rocha que impede a humildade, a cegueira que afasta a graça.' }
    ];

    const burdenBtns = makeButtons(burdenOptions.map(opt => opt.label), 'burden', val => {
      const selectedBurden = burdenOptions.find(opt => opt.label === val);
      if (selectedBurden) {
        this.playerAvatarState.burden = selectedBurden.value;
      }
    });

    const startBtn = this.add.container(0,0,[
      this.add.rectangle(0,0,300,56,this.colors.purple).setOrigin(0.5).setInteractive({useHandCursor:true})
        .on('pointerup',()=> this.scene.start('GameScene')),
      this.add.text(0,0,'INICIAR JORNADA',{
        fontFamily:'Cinzel', fontSize:'26px',
        color:`#${this.colors.text.toString(16)}`
      }).setOrigin(0.5)
    ]);

    // ---------- LAYOUT: distribuição vertical ----------  
    const elements = [
      title,               // 1ª linha
      q1,                  // 2ª linha
      nameInput,           // 3ª linha
      ...genderBtns,       // 4ª linha (em grid)
      ...hairBtns,         // 5ª linha
      qSkin,               // NEW: Skin tone prompt
      ...skinBtns,         // NEW: Skin tone buttons
      qBurden,             // NEW: 7ª linha
      ...burdenBtns,       // NEW: 8ª linha
      startBtn             // 9ª linha
    ];

    const lineHeight = 80;         // espaçamento entre linhas
    let yOffset = -panel.displayHeight/2 + 60;  // ponto de partida

    // cada elemento do array será alinhado a um y crescente dentro do painel
    elements.forEach((obj, idx) => {
      // no caso de grupos (como genderBtns), queremos alinhar todos naquela mesma "linha"
      Phaser.Display.Align.In.Center(obj, panel, 0, yOffset);
      if (idx === 0) {
        // título: um pouco mais de folga
        yOffset += 80;
      } else if (obj === startBtn) {
        // último botão: coloca um pouco acima da base do painel
        yOffset = panel.displayHeight/2 - 60;
        Phaser.Display.Align.In.Center(startBtn, panel, 0, yOffset);
      } else {
        yOffset += lineHeight;
      }
    });

    // primeira renderização
    console.log('playerAvatarState before redraw:', this.playerAvatarState);
    this.avatarRenderer.redraw(this.playerAvatarState);
  }

  update() {
    // animações de avatar, se precisar...
  }
