/* eslint-disable prettier/prettier */
import axios from 'axios';
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, Image, Dimensions, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Box from '../components/box';
import Colors from '../materials/colors';
import { nFormatter, timeSince } from '../materials/utils';
var qs = require('qs');
import { BASE_URL, GOOGLE_KEY } from '@env';
import { PositionContext } from '../app';
import { Youtube } from '../components/icons';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;


function VideosScreen({ route, navigation }) {
    const [data, setData] = useState({});
    const [videos, setVideos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const positionContext = useContext(PositionContext);

    useEffect(() => {
        getdata();
        return () => {
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nextPageToken, positionContext]);

    //get data from youtube
    const getdata = async () => {
        axios.get(BASE_URL, {
            params: {
                'part': ['snippet', 'statistics', 'contentDetails'],
                'chart': 'mostPopular',
                'maxResults': 10,
                'regionCode': positionContext.positionState.code,
                'key': GOOGLE_KEY,
                'pageToken': nextPageToken,
            },
            paramsSerializer: function (params) {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            },
        })
            .then(function (response) {
                setData(response.data);
                if (isLoading) {
                    setVideos([...videos, ...response.data.items]);
                } else {
                    setVideos(response.data.items);
                }
                setIsLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                if (!isLoading) {
                    setVideos([]);
                }
            });
    };
    //get more data
    const getMore = () => {
        if (nextPageToken !== data.nextPageToken &&
            data.pageInfo.totalResults > videos.length) {
            setNextPageToken(data.nextPageToken);
            setIsLoading(true);
        }
    };
    //render video item
    const renderItem = ({ item, index }) => {
        const th = getThumbnailsURL(item.snippet.thumbnails);
        return (<Box width={deviceWidth} key={index}>
            <Box elevation={3} borderRadius={6} borderColor={Colors.gray} mt={4} mb={4}>
                <Image
                    style={{ width: deviceWidth, height: deviceWidth * (parseFloat(th.height / th.width)) }}
                    source={{ uri: th.url }} />
                <Box flexDirection="row" m={8}>
                    <Box as={Image}
                        size={36}
                        borderRadius="full"
                        source={{ uri: th.url }} />
                    <Box flex={1} ml={8} flexDirection="column">
                        <Text numberOfLines={2}>{item.snippet.title}</Text>
                        <Box flexDirection="row"  >
                            <Box as={Text} color={Colors.gray}>{item.snippet.channelTitle}</Box>
                            <Box
                                mt={8}
                                ml={4}
                                mr={4}
                                size={4}
                                bg={Colors.gray}
                                borderRadius="full"
                            />
                            <Box as={Text} color={Colors.gray}>{nFormatter(item.statistics.viewCount, 1)}</Box>
                            <Box
                                mt={8}
                                ml={4}
                                mr={4}
                                size={4}
                                bg={Colors.gray}
                                borderRadius="full"
                            />
                            <Box as={Text} color={Colors.gray}>{`${timeSince(new Date(item.snippet.publishedAt))} ago`}</Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>);
    };
    //loading for more
    const footer = () => {
        return (
            <Box flex={1} alignItems="center">
                {(isLoading === true) && <ActivityIndicator size="large" color={Colors.gray} />}
            </Box>
        );
    };
    const header = () => {
        return (
            <Box bg={Colors.red} height={60} justifyContent="center" alignItems="center" >
                <Box as={Text} fontWeight="bold" fontSize={3} color={Colors.white}>{`${positionContext.positionState.name}'den/dan Videolar`}</Box>
            </Box >
        );
    };
    //List empty state
    const showEmptyListView = () => {
        return (
            <Box flexDirection="column" width={deviceWidth} height={deviceHeight} justifyContent="center" alignItems="center">
                <Youtube width={56} height={56} color={Colors.gray} />
                <Text>Video bulunamadı...</Text>
            </Box>
        );
    };
    //get best image for thumbnail
    const getThumbnailsURL = (thumbnails) => {
        return thumbnails.maxres || thumbnails.high || thumbnails.standart || thumbnails.medium || thumbnails.default;
    };

    return (
        <Box flex={1} justifyContent="center" >
            <FlatList
                data={videos}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={getMore}
                onEndReachedThreshold={0.1}
                ListFooterComponent={footer}
                ListEmptyComponent={showEmptyListView}
                ListHeaderComponent={header}
                stickyHeaderIndices={[0]}

            />
        </Box >
    );
}
export default VideosScreen;
