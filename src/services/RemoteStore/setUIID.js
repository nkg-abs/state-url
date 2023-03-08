import { rndString } from '@laufire/utils/random';
import { map } from '@laufire/utils/collection';

const setUIID = (data) => map(data, (item) => ({
	id: rndString(),
	data: item,
}));

export default setUIID;
