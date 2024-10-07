import { metrics } from 'apps/evuro-frontend-mobile/src/util/metrics';
import { StyleSheet } from 'react-native';

export const usePetProductsStyle = () =>
  StyleSheet.create({
    productFooterContainer: { paddingBottom: '30%' },
    notFound: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  });
