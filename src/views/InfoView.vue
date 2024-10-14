<template>
  <div class="page-container">
    <div class="navbar-placeholder"></div>
    <div class="main-content">
      <div class="transparent-background">
        <div class="button-grid">
          <div v-for="(button, index) in buttons" :key="index" class="column">
            <button
                v-for="btn in button"
                :key="btn.title"
                :class="['btn', btn.size]"
                @click="openPopup(btn.title, btn.content)"
            >
              {{ btn.title }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹出窗口 -->
    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <div class="popup-header">
          <span class="close-btn" @click="closePopup">&lt;</span>
          <h2>{{ popupTitle }}</h2>
        </div>
        <div class="popup-body" v-html="popupContent"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoPage',
  data() {
    return {
      showPopup: false,
      popupTitle: '',
      popupContent: '',
      buttons: [
        [
          { title: '疾病成因', size: 'large', content: '息肉形成的原因有很多种，常见有炎症刺激、饮食不当、遗传因素等。<br>1、炎症刺激：当人的直肠黏膜长期受饮食刺激之后，就会出现炎性反应，从而会导致肠粘膜息肉的产生。这是由于肠粘膜炎症之后会充血水肿，愈合之后虽然疤痕会收缩，但是就会出现息肉的情况。而如果慢性炎症长期刺激，就会导致腺体堵塞，从而储留粘液，导致息肉发作。遇到此种情况需及时到医院就医治疗。<br>2、饮食不当：平时饮食不当是诱发直肠息肉的直接因素，这是由于食物中的细菌和胆酸之间相互作用，会产生腺瘤型的息肉。应及时就医，明确病因，进行治疗。<br>3、遗传因素：部分息肉产生和遗传因素有关，比如说基因突变或者有家族史的情况。需进行进一步家族病史的调查，明确病因。<br>产生息肉的原因多种多样，应及时就医，明确病因后，配合医生进行治疗。' },
          { title: '医学突破', size: 'small', content: '1、内镜下黏膜切除术：可在显微镜下，将病变组织切除，多应用于较小的息肉，手术损伤小，但对于医生要求较高，建议到规模较大的医院进行;<br>2、内镜下黏膜剥离术：是在内镜下，于病变部位作黏膜切开，将病变组织剥离，随后再进行创面缝合的手术方式，多应用于带蒂的息肉，需特别注意避免损伤周围正常组织;<br>3、内镜下黏膜剥离术：通过在息肉的基底部进行环形切除的手术方式，多应用于带蒂的良**肉，需特别注意避免损伤正常黏膜;<br>核心提示：胃肠道息肉切除，在临床上技术较为成熟，多采取内镜下切除，常见术式包括内镜下黏膜切除术、内镜下黏膜剥离术、内镜下黏膜剥离术、内镜下钛夹结扎术等，可根据个人情况在医生指导下选择。' }
        ],
        [
          { title: '如何预防', size: 'medium', content: '想要有效预防肠息肉，则应该调整饮食习惯、保持规律生活、加强体育锻炼，并且积极治疗肠道炎症性疾病。<br>第一、调整饮食习惯：平时要合理调整自己的饮食结构，不可过多进食过烫、过冷以及腐败变质的食物。年老体弱的人群，可以适当进食含碱量比较高的碱性食物。<br>第二、保持规律生活：保持规律生活也能有效预防肠息肉，平时应该合理调整自己的作息时间，坚持早睡早起，尽量不要长期熬夜，以免加重体质酸化而增加肠息肉的发病风险。只有保证健康的生活方式，才能促使细胞正常增生，并且保持弱碱性体质。<br>第三、加强体育锻炼：坚持体育锻炼能够有效预防多种疾病，其中就包括肠息肉。锻炼的过程中身体会大量出汗，体内的酸性物质可以通过汗液排到体外，也能预防酸性体质的形成。<br>第四、治疗肠道炎症性疾病：肠道炎症性疾病是引发肠息肉的危险因素之一，因此出现肠道疾病的情况下，一定要尽早入院接受检查和治疗，防止长期受到炎症刺激而增加肿瘤性病变的发病风险。' },
          { title: '典型症状', size: 'large', content: '胃肠长息肉一般包括胃长息肉以及肠长息肉。其中胃长息肉有胃疼痛、烧灼、出血等症状，肠长息肉有腹部疼痛、排便习惯改变、便血等症状。<br>1.胃长息肉：如果是胃长息肉，发病初期通常没有明显的临床症状，但随着息肉的体积增大，患者可能会出现胃疼痛的症状，比如隐痛、钝痛等。同时，息肉容易刺激胃酸分泌，导致胃烧灼，甚至可能会导致反酸。此外，息肉破溃后还可能会导致出血，具体表现为呕血、黑便等。<br>2.肠长息肉：若是肠长息肉，患者则可能会出现腹部疼痛的症状，具体表现为腹部隐痛、剧烈疼痛等。此外，由于肠长息肉容易影响肠道功能，还可能会导致排便习惯改变，比如排便次数增多、里急后重等。若是肠长息肉后破溃、糜烂，还会引起出血，从而导致便血。' }
        ],
        [
          { title: '治疗方案', size: 'extra-large', content: '息肉的治疗方案主要包括以下几个方面：<br>1. 内镜下切除：这是最常见的治疗方法，适用于大多数良性息肉。医生通过内镜将息肉切除，这种方法创伤小、恢复快。<br>2. 手术切除：对于较大或可能恶变的息肉，可能需要进行开放手术或腹腔镜手术来切除。<br>3. 药物治疗：某些情况下，医生可能会推荐使用非甾体抗炎药或其他药物来控制症状或预防息肉复发。<br>4. 定期监测：对于一些小的、无症状的息肉，医生可能建议定期监测而不立即切除。<br>5. 生活方式调整：包括改善饮食习惯、增加运动、戒烟限酒等，有助于预防息肉复发。<br>6. 中医治疗：某些中医方法如中药、针灸等也可能有辅助治疗作用。<br>具体的治疗方案需要根据息肉的大小、位置、数量以及患者的整体健康状况来确定，建议在专业医生的指导下选择最适合的治疗方案。' },
          { title: '疾病历史', size: 'small', content: '"息肉"一词最早记载于《黄帝内经》，其《灵枢·水胀》篇曰："肠覃如何？歧伯曰：寒气客于肠外，与卫气相搏，气不得荣，因有所系，癖而内着，恶气乃起，息肉乃生。" <br>其病名、病位、形态、病因病理机制上与西医学所称肠息肉或息肉病相类同。中医属于"息肉痔""癔肉""肠蕈""樱桃痔"等范畴。中医学认为息肉的发生与饮食不节、劳倦内伤、情志失调及先天禀赋不足等因素有关系。 <br>湿热下注：过食肥甘厚味、辛辣醇酒，致湿热内生，湿邪郁久化热，湿热蕴结，下注大肠，导致肠道气机不利，经络阻滞，淤血浊气凝聚，蕴结不散，息肉乃生。 <br>气滞血淤：饮食不节，劳倦过度，导致脾胃运化功能不足，湿邪内生，下注大肠，经络阻塞，淤血、浊气凝聚不散，日久发为息肉。 <br>脾气亏虚：先天禀赋不足或思虑过度，忧思不解，郁结伤脾，脾气不行，水湿不化，津液凝聚成痰，痰气郁结于大肠，则化生息肉。' }
        ]
      ]
    };
  },
  methods: {
    openPopup(title, content) {
      this.popupTitle = title;
      this.popupContent = content;
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    }
  }
};
</script>

<style scoped>
.page-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: transparent;
}

.navbar-placeholder {
  height: 6vw;
  max-height: 60px;
}

.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.transparent-background {
  width: 90vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(192, 236, 177, 0.1);
  border-radius: 2vw;
}

.button-grid {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 2vw;
}

.column {
  width: 31%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.btn {
  border: none;
  border-radius: 1.5vw;
  background-color: rgba(155, 236, 217, 0.14);
  font-size: 2vw;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 1vw;
  /* 加深按钮的阴影和高斯模糊 */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.btn:hover {
  background-color: #8FBC8F;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.18);
  transform: translateY(-2px);
}

.column:nth-child(1) .btn.large { height: 66%; }
.column:nth-child(1) .btn.small { height: 30%; }

.column:nth-child(2) .btn.medium { height: 33%; }
.column:nth-child(2) .btn.large { height: 63%; }

.column:nth-child(3) .btn.extra-large { height: 60%; }
.column:nth-child(3) .btn.small { height: 36%; }

@media (max-width: 768px) {
  .button-grid {
    flex-direction: column;
    align-items: stretch;
  }

  .column {
    width: 100%;
    margin-bottom: 2vw;
  }

  .btn {
    font-size: 4vw;
    margin-bottom: 2vw;
  }
}
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  width: 60%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.popup-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.close-btn {
  font-size: 28px;
  cursor: pointer;
  margin-right: 15px;
  color: #333;
}

.popup-header h2 {
  font-size: 24px;
  margin: 0;
  color: #333;
}

.popup-body {
  text-align: left;
  font-size: 18px;
  line-height: 1.6;
  color: #444;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .popup-content {
    width: 90%;
    padding: 20px;
  }

  .popup-header h2 {
    font-size: 20px;
  }

  .popup-body {
    font-size: 16px;
  }
}

@media (max-height: 600px) {
  .popup-content {
    max-height: 90vh;
  }
}
</style>
