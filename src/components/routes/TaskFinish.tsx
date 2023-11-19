import { StyleSheet, Text, View } from 'react-native';
import { NavigationRoutePath } from '../../navigation';
import ContentArea from '../ContentArea';
import RouteContainer from '../RouteContainer';
import Ui from '../../ui';
import ContentSeparator from '../ContentSeparator';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import PressableOpacity from '../pressable/PressableOpacity';
import { useState } from 'react';
import RectangleButton from '../input/RectangleButton';
import Redux from '../../redux/redux';
import { navigationActions } from '../../redux/slices/navigation';

export default function TaskFinish() {
  const [concentrationLevel, setConcentrationLevel] = useState(0);

  const concentrationLevels = [1, 2, 3, 4, 5].map((level) => (
    <PressableOpacity onPress={() => setConcentrationLevel(level)} key={level}>
      <MaterialCommunityIcons
        name='fire'
        color={Ui.color.white}
        size={33}
        style={[
          styles.concentrationLevelItem,
          { backgroundColor: level <= concentrationLevel ? Ui.color.orange : Ui.color.gray },
        ]}
      />
    </PressableOpacity>
  ));

  return (
    <RouteContainer path={NavigationRoutePath.TaskFinish} title='作業終了'>
      <View style={styles.container}>
        <ContentArea style={styles.results}>
          <Text style={styles.message}>
            お疲れ様でした！
          </Text>
          <Text style={styles.status}>
            5回連続で取り組み中
          </Text>
          <ContentSeparator color={Ui.color.border.lightGray} style={{ marginBottom: Ui.dimension.margin / 2 }} />
          <View style={styles.property}>
            <Text style={{ fontSize: 16 }}>
              作業時間
            </Text>
            <Text style={styles.propertyData}>
              60分
            </Text>
          </View>
          <ContentSeparator color={Ui.color.border.lightGray} style={{ marginBottom: Ui.dimension.margin / 2 }} />
          <View style={styles.property}>
            <Text style={{ fontSize: 16 }}>
              休憩時間
            </Text>
            <Text style={styles.propertyData}>
              10分
            </Text>
          </View>
          <ContentSeparator color={Ui.color.border.lightGray} style={{ marginBottom: Ui.dimension.margin / 2 }} />
          <View style={styles.property}>
            <Text style={{ fontSize: 16 }}>
              現在のレベル
            </Text>
            <Text style={styles.propertyData}>
              +100pt
            </Text>
          </View>
          <ContentSeparator color={Ui.color.border.lightGray} style={{ marginBottom: Ui.dimension.margin * 2 }} />
          <Text style={{ fontSize: 16 }}>
            今回の集中度を記録しましょう
          </Text>
          <View style={styles.concentrationLevel}>
            {concentrationLevels}
          </View>
          <RectangleButton text='閉じる' onPress={() => Redux.store.dispatch(navigationActions.jumpTo(NavigationRoutePath.Home))} />
        </ContentArea>
      </View>
    </RouteContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
  },
  results: {
    alignItems: 'center',
    display: 'flex',
    marginHorizontal: Ui.dimension.margin,
    padding: Ui.dimension.margin * 2,
  },
  message: {
    fontSize: 20,
    marginBottom: 5,
  },
  status: {
    backgroundColor: Ui.color.main,
    color: Ui.color.white,
    paddingBottom: 4,
    paddingHorizontal: 5,
    paddingTop: 1,
    marginBottom: Ui.dimension.margin,
  },
  property: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Ui.dimension.margin / 2,
    width: '100%',
  },
  propertyData: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  concentrationLevel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Ui.dimension.margin * 2,
    marginTop: 8,
    width: '70%',
  },
  concentrationLevelItem: {
    backgroundColor: Ui.color.gray,
    borderRadius: 100,
    padding: 1,
  },
});
