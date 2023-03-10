function departementToOptions(datas, config = {}) {
  const { valueKey = "id", nullOption } = config;
  let options = datas.map((departement) => ({
    departement,
    label: formatDepartementLabel(departement),
    value: departement[valueKey],
  }));
  options.sort(function (a, b) {
    return a.label.localeCompare(b.label);
  });
  if (
    nullOption &&
    nullOption.label !== null &&
    nullOption.label !== undefined
  ) {
    const nullOption = {
      label: config.nullOption.label,
      value: null,
    };
    options = [nullOption].concat(options);
  }

  return options;
}

function formatDepartementLabel(departement) {
  return `${departement["id"]} - ${departement["nom"]}`;
}

export const DepartementFormUtil = {
  departementToOptions,
  formatDepartementLabel,
};
