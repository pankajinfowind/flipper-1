import 'package:built_collection/src/list.dart';
import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/model/category.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flipper/routes/router.gr.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

enum CategoriesEnum { beverage, drinks, ikawa }

class AddCategoryScreen extends StatefulWidget {
  AddCategoryScreen({Key key}) : super(key: key);

  @override
  _AddCategoryScreenState createState() => _AddCategoryScreenState();
}

class _AddCategoryScreenState extends State<AddCategoryScreen> {
  getUnitsWidgets(BuiltList<Category> categories) {
    List<Widget> list = new List<Widget>();
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].name != "toBeModified") {
        list.add(
          GestureDetector(
            onTap: () {
              StoreProvider.of<AppState>(context)
                  .dispatch(CurrentCategory(category: categories[i]));

              StoreProvider.of<AppState>(context)
                  .dispatch(InvokePersistFocusedCategory());
            },
            child: ListTile(
              title: Text(
                categories[i].name,
                style: TextStyle(color: Colors.black),
              ),
              trailing: Radio(
                value: categories[i].id,
                groupValue: categories[i].focused ? categories[i].id : 0,
                onChanged: (int categoryId) {
                  StoreProvider.of<AppState>(context)
                      .dispatch(CurrentCategory(category: categories[i]));

                  StoreProvider.of<AppState>(context)
                      .dispatch(InvokePersistFocusedCategory());
                },
              ),
            ),
          ),
        );
      }
      list.add(Center(
        child: Container(
          width: 400,
          child: Divider(
            color: Colors.black,
          ),
        ),
      ));
    }
    return Wrap(children: list);
  }

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        return Scaffold(
          appBar: CommonAppBar(
            showActionButton: false,
            title: S.of(context).category,
            icon: Icons.close,
            multi: 3,
            bottomSpacer: 52,
          ),
          body: Column(
            children: <Widget>[
              Center(
                child: Container(
                  width: 400,
                  child: Divider(
                    color: Colors.black,
                  ),
                ),
              ),
              GestureDetector(
                onTap: () {
                  StoreProvider.of<AppState>(context)
                      .dispatch(CreateEmptyTempCategoryAction());
                  Router.navigator.pushNamed(Router.createCategoryInputScreen);
                },
                child: ListTile(
                  title: Text("Create Category",
                      style: TextStyle(color: Colors.black)),
                  trailing: Wrap(
                    children: <Widget>[Icon(Icons.arrow_forward_ios)],
                  ),
                ),
              ),
              getUnitsWidgets(vm.categories),
              Visibility(
                visible: false,
                child: FlatButton(
                  child: Text("invisible button"),
                  onPressed: vm.categoryName != null
                      ? _handleCreateCategory(vm)
                      : null,
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  _handleCreateCategory(CommonViewModel vm) {
    //fire the event to create category
    StoreProvider.of<AppState>(context).dispatch(
        CreateCategoryFromAddItemScreenAction(categoryName: vm.categoryName));
  }
}
