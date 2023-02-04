const calculateReward = (amount) => {
  if (amount > 100) return (amount - 100) * 2 + 50;
  if (amount > 50) return amount - 50;
  return 0;
};

export default calculateReward;
