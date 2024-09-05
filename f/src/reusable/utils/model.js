export function userModel() {
  return [
    {
      rowLabels: "name",
      inputNames: ["firstName", "middleName", "lastName"],
      isRequired: [true, true, true],
    },
    {
      rowLabels: "workInfo",
      inputNames: [
        "position",
        "status",
        "birthdate",
        "email",
        "employmentDate",
        "wage",
      ],
      isRequired: [true, true, true, true, true, true],
      inputTypes: ["option", "option", "date", "email", "date", "text"],
      options: [
        ["sales", "cashier", "optician", "optometrist"],
        ["single", "married", "widowed", "divorced"],
        [],
      ],
    },
    {
      rowLabels: "address",
      inputNames: ["street", "purok", "brgy", "city", "province", "country"],
      isRequired: [false, false, true, true, true, true],
    },
    {
      rowLabels: "contactInfo",
      inputNames: [
        "contactNumber1",
        "contactNumber2",
        "contactNumber3",
        "password",
        "repeatPassword",
      ],
      isRequired: [true, false, false, true, true],
      inputTypes: ["text", "text", "text", "password", "password"],
    },
    {
      rowLabels: "governmentInfo",
      inputNames: ["SSS", "PagIbig", "PhilHealth", "TIN"],
      isRequired: [false, false, false, false],
    },
    {
      rowLabels: "emergencyInfo",
      inputNames: [
        "contactPersonNameInEmergency",
        "contactPersonNumberInEmergency",
      ],
      isRequired: [true, true],
    },
    {
      rowLabels: "selectImage",
      inputNames: ["image"],
      isRequired: [true],
      inputTypes: ["file"],
      specifyFiles: [".png,.jpg,.jpeg"],
    },
  ];
}

export function userModelEdit() {
  return [
    {
      rowLabels: "name",
      inputNames: ["firstName", "middleName", "lastName"],
      isRequired: [true, true, true],
    },
    {
      rowLabels: "workInfo",
      inputNames: [
        "position",
        "status",
        "birthdate",
        "email",
        "employmentDate",
        "wage",
      ],
      isRequired: [true, true, true, true, true, true],
      inputTypes: ["option", "option", "date", "email", "date", "text"],
      options: [
        ["sales", "cashier", "optician", "optometrist"],
        ["single", "married", "widowed", "divorced"],
        [],
      ],
    },
    {
      rowLabels: "address",
      inputNames: ["street", "purok", "brgy", "city", "province", "country"],
      isRequired: [false, false, true, true, true, true],
    },
    {
      rowLabels: "contactInfo",
      inputNames: [
        "contactNumber1",
        "contactNumber2",
        "contactNumber3",
        "password",
        "repeatPassword",
      ],
      isRequired: [true, false, false, true, true],
      inputTypes: ["text", "text", "text", "password", "password"],
    },
    {
      rowLabels: "governmentInfo",
      inputNames: ["SSS", "PagIbig", "PhilHealth", "TIN"],
      isRequired: [false, false, false, false],
    },
    {
      rowLabels: "emergencyInfo",
      inputNames: [
        "contactPersonNameInEmergency",
        "contactPersonNumberInEmergency",
      ],
      isRequired: [true, true],
    },
    {
      rowLabels: "selectImage",
      inputNames: ["image"],
      isRequired: [false],
      inputTypes: ["file"],
      specifyFiles: [".png,.jpg,.jpeg"],
    },
  ];
}
