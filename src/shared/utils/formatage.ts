export const formatNombre = (valeur: number | string | undefined): string => {
  if (valeur === undefined || valeur === null) return '';
  return new Intl.NumberFormat('fr-FR').format(Number(valeur));
};
