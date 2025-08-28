const {
  HTMLField,
  SchemaField,
  NumberField,
  StringField,
  FilePathField,
  ArrayField,
} = foundry.data.fields;

class CharacterData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      biography: new HTMLField(),
      riichi: new NumberField({
        required: true,
        integer: true,
        min: 0,
        max: 1,
        initial: 0,
      }),
      score: new NumberField({
        required: true,
        integer: true,
        initial: 25000,
      }),
      seat: new StringField({
        required: true,
        choices: ["East", "South", "West", "North"],
        initial: "East",
      }),

      tiles: new ArrayField(new StringField()),
      crest: new FilePathField({ required: false, categories: ["IMAGE"] }),
    };
  }

  // 문서가 업데이트될 때 자동으로 호출되어, 서브타입에 특화된 값을 계산하거나 준비하는 데 사용됨
  prepareData() {
    super.prepareData();
  }
}
