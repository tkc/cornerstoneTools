function IsRestoreState (data) {
  return data.hasOwnProperty (['type']) && data.type === 'restore';
}
export {IsRestoreState};
