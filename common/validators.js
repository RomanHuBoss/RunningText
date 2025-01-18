const validators = {
    isPositive: (value) => value > 0,
    isInRangeExclusive: (value, left, right) => value > a && value < b,
    isInRangeInclusive: (value, left, right) => value >= a && value <= b,
    isMore: (value, left) => value > left,
    isLess: (value, right) => value < right,
    isMoreOrEqual: (value, left) => value >= left,
    isLessOrEqual: (value, right) => value <= right,
    isInArray: (value, array) => array.includes(value ),
    isEmpty: (value) => !value,
};


