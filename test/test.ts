import { Buffer } from 'buffer';
import { assert } from 'chai';
import { describe } from 'mocha';

import { PrivateKey, AugSchemeMPL } from 'chia-bls';
import { derivePublicKeyPath, derivePrivateKeyPath, calculateSyntheticPublicKey, calculateSyntheticPrivateKey } from '../src/utils/keys';

const DEFAULT_HIDDEN_PUZZLE_HASH: Uint8Array = Buffer.from("711d6c4e32c92e53179b199484cf8c897542bc57f2b22582799f9d657eec4699", 'hex');

describe('Synthetic public keys', () => {
    const hexKeys = [
        "b0c8cf08fdbe7fdb7bb1795740153b944c32364b100c372a05833554cb97794563b096cb5f57bfa09f38d7aebb48704e",
        "8b1b92da63fdf8c4b53349da2fdd84685303587653f1a75826a56a97ea50b86ca8a0fbf6a5d6605c70b6be324bc59c85",
        "a472c01f0b32457aea348ef0493e1d394445df528e0d4139056ba6b4eb57eed593732c830acd897dab502f119d1ae2ff",
        "8b9e4040514e55110cd899b43a5fb8fa6f74e28620f80d20401101f88a77624128c818238073f618b72065a7a7264402",
        "ac334afc58318068c6ec2daffb336cedc8a01d382e87852c62846fa17f9249c8b0896d1c09a26c80ec945f93002d0ff4",
        "8d63ad4f29c7f163f6742f41bb3dc08ea6975ecad0b76324545e6154d89370a695b9ae803bc65c3384d8557f3de67a40",
        "b5d5540d7e5721688fa7876a49028135d42b67a0e73c257463f01775b1c973b6161973608469b3a42b20b0392aeca46c",
        "92fd0374247c22e2deaaccd844dc152b87a736d4df531fa94fdd04948295310c21a2fbe5ff6b25e12ae12afcc90716d8",
        "adda2cfe848768537074e91f4e08136fe85e7315e326063c6945314492e1eb6903911176dcbdb84637d49a26afbf5437",
        "b0d252b37fc5b50f281c1d27151963e13be1d6bc2f9f32e263806b03e843ff9198a6128247b9d51b64d28bc7c8646674",
        "95873a2fff6e139c257be5eee37262e0774920965c26483c9b32cceb565abbc74dcfb36679224fb7f7d5ac0060015aea",
        "8b8b469a973a5702bb0b51f774041da814c2b0d81a0d0a58b946c9c995be9dfaadc1501f0adf2088a66d67a4a6f92193",
        "b27b87ea6b1e9653b54d2377e95708444f886ca0fc1728889bf3afee2f8cbe4c618b7127e9f38a189e6d56dd7933cfff",
        "b46d152384d888737aebe52bb9127314f678733c45948b00075575db79b732a2bbfa47dab0886863ade7f5fbdc4a14fa",
        "ada6da1ce6464d22dcbc1fe4396a0d1aa8a486fc7094f89a5d11a81cf75a1209eca7bae3b1d943dcff6e39c163d29fb5",
        "b3b4ceea11bbc6fafb5800caa593385644a3262245357e5013be5c1cf622bf7cb0b667e586269c346459c3b5faf0eaef"
    ];

    const sk = PrivateKey.fromHex("6bb19282e27bc6e7e397fb19efc2627a412410fdfd13bf14f4ce5bfdce084c71");
    const pk = sk.getG1();
    const intermediate = derivePublicKeyPath(pk, [12381, 8444, 2]);

    hexKeys.forEach((hex, index) => {
        it(`Index ${index}`, () => {
            const key = AugSchemeMPL.deriveChildPkUnhardened(intermediate, index);
            const syntheticKey = calculateSyntheticPublicKey(key, DEFAULT_HIDDEN_PUZZLE_HASH);
            const syntheticKeyHex = syntheticKey.toHex();

            assert.equal(syntheticKeyHex, hex);
        });
    });
});


describe('Synthetic secret keys', () => {

    const hexKeys = [
        "64c91fe4534fc21c36096be012e0e14de484180a1a510783367bcd5ccecaad0c",
        "13a0f95de0dd347c769ee79e9828a698bfe53429233375e891f05b4e0eaa8219",
        "4399fcc4435e014f24fa31f8acf419367e0fbac70c9d6df53a7cc31623a10eac",
        "5ef7d10f546d45ae919277568d2142f9e907933d4393111c54b13425c20abce1",
        "0c39c6c5d70ee05cbd3da44ae918af21469f235dc0bea0116566a4379d33f1f5",
        "39fbf8ed5b0b7071ba155d7a0180af13ea88aec08d74afaa86ea11ad61cb06ec",
        "31c03611b14be9c811beb435162e2c6e773efc77a4a5a5b2aca87e27687f6a12",
        "222b62feb12390110122c63c176c2216cf85ad17bdbfd6240663eeeeab47abc0",
        "18012a00d6ab3aec680960cc21beec41b78c731be1720f0c30f09e32892e918f",
        "31e8f4a82182f072cb9035acdb45ae3e4c5d631b4538dd89afa71294792a774f",
        "196f72aaa1403dc0e3334a3b7a1910fbe61dfabd3aba178ed7e1ba7c80dccce2",
        "27bf40f3a6fa7b2b47f48402e423ee2c5a441e6ba716fc6fef02c3dd5285df20",
        "0bccd277dbeb9742e816b0696b298277985ec7008ba61a585af63b4a4b6d7108",
        "3d77df05a9bbda18cc23de6ac1b9744f0a07622df925ae253b3418c41709dcc8",
        "465a7d9a106522d4111e5f35ca5ca4fb6889b884f15eba024e3826b8191cf784",
        "68fe97fadd389f4051b6bd0c320f17d08ba7b4951b33d525b1f23d38226e5d0a",
    ];

    const sk = PrivateKey.fromHex("6bb19282e27bc6e7e397fb19efc2627a412410fdfd13bf14f4ce5bfdce084c71");
    const intermediate = derivePrivateKeyPath(sk, [12381, 8444, 2], false);

    hexKeys.forEach((hex, index) => {
        it(`Index ${index}`, () => {
            const key = AugSchemeMPL.deriveChildSkUnhardened(intermediate, index);
            const syntheticKey = calculateSyntheticPrivateKey(key, DEFAULT_HIDDEN_PUZZLE_HASH);
            const syntheticKeyHex = syntheticKey.toHex();
            assert.equal(syntheticKeyHex, hex);
        });
    });
});