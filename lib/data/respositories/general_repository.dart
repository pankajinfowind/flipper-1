import 'package:flipper/data/main_database.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/model/business.dart';
import 'package:redux/redux.dart';


class GeneralRepository {
  Future<int> insert(Store<AppState> store, int value) {
    var tab = new TabsTableData(tab: value,id:1);
    return store.state.database.tabsDao.insert(tab);
  }
  Future<bool> update(Store<AppState> store, int value) {
    final b = TabsTableData(id: 1,tab: value);
    return store.state.database.tabsDao.updateTab(b);
  }
  Future<TabsTableData> getTab(Store<AppState> store) {
    return store.state.database.tabsDao.getTab();
  }

}