import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CalendarHeader from './CalendarHeader';
import DivisionLine from './DivisionLine';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [firstWeekDay, setFirstWeekDay] = useState(0); //첫 째 날 요일 인덱스(0: 일요일, 1: 월요일)
  const [dateArray, setDateArray] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('식단');

  const yoilArr = ['일', '월', '화', '수', '목', '금', '토'];

  // date 변경(화살표 클릭) 시 해당 월의 day배열 계산
  useEffect(() => {
    const newYear = date.getFullYear();
    const newMonth = date.getMonth();
    const newFirstWeekDay = new Date(newYear, newMonth, 1).getDay();
    const lastDate = new Date(newYear, newMonth + 1, 0).getDate();
    const previousLastDate = new Date(newYear, newMonth, 0).getDate();

    setYear(newYear);
    setMonth(newMonth);
    setFirstWeekDay(newFirstWeekDay);

    let dateArr = [];

    // 전 달에 대한 날짜 추가
    for (let i = 0; i < newFirstWeekDay; i++) {
      dateArr.push({
        year: newYear,
        month: newMonth - 1,
        day: previousLastDate - i,
      });
    }
    dateArr.reverse();

    // 현재 달 날짜 추가
    for (let i = 1; i <= lastDate; i++) {
      dateArr.push({
        year: newYear,
        month: newMonth,
        day: i,
      });
    }

    setDateArray(dateArr);
  }, [date]);

  // 이전 달로 이동
  const goPrevMonth = () => {
    setDate(new Date(year, month - 1));
  };

  // 다음 달로 이동
  const goNextMonth = () => {
    setDate(new Date(year, month + 1));
  };

  const selectDay = _dateObj => {
    setSelectedDate(_dateObj);
  };

  const selectCategory = _category => {
    setSelectedCategory(_category);
  };

  // 받침 구분 판단 헬퍼
  const hasFinalConsonant = word => {
    if (!word || word.length === 0) {
      return false;
    }
    const lastChar = word[word.length - 1];
    const unicode = lastChar.charCodeAt(0);

    if (unicode >= 0xac00 && unicode <= 0xd7a3) {
      const index = unicode - 0xac00;
      return index % 28 !== 0;
    }

    return false;
  };

  const renderDays = () => {
    return (
      <View style={styles.daysGrid}>
        {dateArray.map((dateObj, index) => {
          // 개선 필요 (추후 수정)
          const isSelected =
            selectedDate &&
            dateObj.year === selectedDate.year &&
            dateObj.month === selectedDate.month &&
            dateObj.day === selectedDate.day;
          return (
            <TouchableOpacity
              style={styles.dayBox}
              key={index}
              onPress={() => selectDay(dateObj)}>
              <View style={isSelected && styles.selectedDayButton} key={index}>
                <Text
                  style={[
                    index < firstWeekDay ? styles.emptyDayText : styles.dayText,
                    isSelected && styles.selectedDayText,
                  ]}>
                  {dateObj.day}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CalendarHeader
        date={date}
        onPrevMonth={goPrevMonth}
        onNextMonth={goNextMonth}
      />
      <View style={styles.weekRow}>
        {yoilArr.map((day, index) => (
          <Text style={styles.weekDay} key={index}>
            {day}
          </Text>
        ))}
      </View>
      {renderDays()}

      <View style={{height: 20}} />
      <DivisionLine />

      <View style={styles.categoryButtonContainer}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory == '식단' && styles.selectedCategoryButton,
          ]}
          onPress={() => selectCategory('식단')}>
          <Text style={styles.categoryText}>식단 0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory == '운동' && styles.selectedCategoryButton,
          ]}
          onPress={() => selectCategory('운동')}>
          <Text style={styles.categoryText}>운동 0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory == '신체' && styles.selectedCategoryButton,
          ]}
          onPress={() => selectCategory('신체')}>
          <Text style={styles.categoryText}>신체 0</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.guidanceText}>
        추가버튼을 눌러{'\n'}
        {selectedCategory}
        {hasFinalConsonant(selectedCategory) ? '을' : '를'}
        기록해주세요
      </Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          console.log('추가');
        }}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingVertical: 20,
  },
  weekRow: {
    marginHorizontal: 10,
    flexDirection: 'row',
    marginBottom: 10,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    color: '#666',
  },
  sunday: {
    color: 'red',
  },
  saturday: {
    color: 'skyblue',
  },
  daysGrid: {
    marginHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayBox: {
    width: '14.28%',
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDayButton: {
    width: '50%',
    height: '50%',
    borderRadius: 20,
    backgroundColor: 'skyblue',
    borderWidth: 1,
    borderColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    color: '#000',
  },
  emptyDayText: {
    color: '#999',
  },
  selectedDayText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  categoryButtonContainer: {
    backgroundColor: '#f5f5f5',
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 5,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  categoryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCategoryButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 18,
  },
  guidanceText: {
    fontSize: 15,
    marginTop: 30,
    textAlign: 'center',
    color: '#c0c0c0',
  },
  addButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: 'skyblue',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 50,
  },
});

export default Calendar;
