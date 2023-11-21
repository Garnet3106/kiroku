import { StyleSheet, Text, View } from 'react-native';
import { NavigationRoutePath } from '../../navigation';
import ContentArea from '../ContentArea';
import RouteContainer from '../RouteContainer';
import Ui from '../../ui';
import ContentSeparator from '../ContentSeparator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PressableOpacity from '../pressable/PressableOpacity';
import { useState } from 'react';
import RectangleButton from '../input/RectangleButton';
import Redux from '../../redux/redux';
import { navigationActions } from '../../redux/slices/navigation';
import { t } from '../../translations';

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
    <RouteContainer path={NavigationRoutePath.TaskFinish} title={t('taskFinish.taskFinish')}>
      <View style={styles.container}>
        <ContentArea style={styles.results}>
          <Text style={styles.message}>
            {t('taskFinish.wellDone')}
          </Text>
          <Text style={styles.status}>
            5回連続で取り組み中
          </Text>
          <ContentSeparator color={Ui.color.border.lightGray} style={{ marginBottom: Ui.dimension.margin / 2 }} />
          <View style={styles.property}>
            <Text style={{ fontSize: 16 }}>
              {t('taskFinish.properties.workingTime')}
            </Text>
            <Text style={styles.propertyData}>
              {t('taskFinish.properties.mins', { min: 60 })}
            </Text>
          </View>
          <ContentSeparator color={Ui.color.border.lightGray} style={{ marginBottom: Ui.dimension.margin / 2 }} />
          <View style={styles.property}>
            <Text style={{ fontSize: 16 }}>
              {t('taskFinish.properties.recessTime')}
            </Text>
            <Text style={styles.propertyData}>
              {t('taskFinish.properties.mins', { min: 10 })}
            </Text>
          </View>
          <ContentSeparator color={Ui.color.border.lightGray} style={{ marginBottom: Ui.dimension.margin / 2 }} />
          <View style={styles.property}>
            <Text style={{ fontSize: 16 }}>
              {t('taskFinish.properties.currentLevel')}
            </Text>
            <Text style={styles.propertyData}>
              {t('taskFinish.properties.plusPt', { pt: 100 })}
            </Text>
          </View>
          <ContentSeparator color={Ui.color.border.lightGray} style={{ marginBottom: Ui.dimension.margin * 2 }} />
          <Text style={{ fontSize: 16 }}>
            {t('taskFinish.letsRecordYourConcentrationLevel')}
          </Text>
          <View style={styles.concentrationLevel}>
            {concentrationLevels}
          </View>
          <RectangleButton text={t('taskFinish.close')} onPress={onPressCloseButton} />
        </ContentArea>
      </View>
    </RouteContainer>
  );

  function onPressCloseButton() {
    setConcentrationLevel(0);
    Redux.store.dispatch(navigationActions.jumpTo(NavigationRoutePath.Home));
  }
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
