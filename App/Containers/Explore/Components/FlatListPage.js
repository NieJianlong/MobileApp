import React from 'react';
import {
    Image,
    StyleSheet,
    FlatList,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { HPageViewHoc } from 'react-native-head-tab-view'
import staticData from '../config/staticData'
import AnimatedRefreshControl from './AnimatedRefreshControl'
const HFlatList = HPageViewHoc(FlatList)
const SFlatList = HPageViewHoc(FlatList, { slideAnimated: true })




export default class FlatListPage extends React.PureComponent {
   

    constructor(props: any) {
        super(props);
        this.state = {
            isRefreshing: false,
            signOfRefresh: true,
            data: staticData.Page2Data
        }
    }

    _renderRefreshControl = (refreshProps: any) => {
        return <AnimatedRefreshControl {...refreshProps} />
    }

    componentWillUnmount() {
        if (this.mTimer) {
            clearInterval(this.mTimer)
        }
    }

    onStartRefresh = () => {
        this.setState({ isRefreshing: true })

        this.mTimer = setTimeout(() => {
            this.setState({ isRefreshing: false })
        }, this.props.timecount);
    }

    renderItem = (itemInfo: { item: FlatListItemInfo, index: number }) => {
        const { item, index } = itemInfo
        return (
            <View style={[styles.flatItem, { height: item.height }]}>
                {item.image ? <Image style={{ width: item.imgSize, height: item.imgSize, marginRight: 10, borderRadius: 5 }} source={item.image} /> : null}
                <Text>{`${item.text}${index}`}</Text>
            </View>
        )
    }

    renderFooterComponent = () => {
        return (
            <TouchableOpacity onPress={() => {
                if (this.mFlatlist) {
                    this.mFlatlist.getNode().scrollToOffset({ offset: 0, animated: true })
                }
            }}>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.titleStyle}>回到顶部</Text>
                </View>
            </TouchableOpacity>
        )
    }
    keyExtractor = (item: any, index: number) => index.toString()
   
    _ref = (_ref: any) => this.mFlatlist = _ref
    render() {
        const props = this.props.isPullRefresh ? {
            isRefreshing: this.state.isRefreshing,
            onStartRefresh: this.onStartRefresh,
            renderRefreshControl: this._renderRefreshControl
        } : {}
        const { data } = this.state;
        const Container = this.props.slideAnimated ? SFlatList : HFlatList

        return (
            <Container
                style={styles.container}
                data={data}
                renderItem={this.renderItem}
                ref={this._ref}
                keyExtractor={this.keyExtractor}
                ListFooterComponent={this.renderFooterComponent}
                index={this.props.index}
                {...props}
            />
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    titleStyle: {
        height: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    sectionTitle: {
        color: '#4D4D4D',
        fontSize: 15,
    },
    imageStyle: {
        width: '100%',
        height: 200
    },
    flatItem: {
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
        flexDirection: 'row',
        alignItems: 'center'
    },

});