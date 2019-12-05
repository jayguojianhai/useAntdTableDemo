/**
 * author     : jayguo
 * createTime : 2019-12-04 22:01
 */
import { Tag } from 'antd';

export default function({ filters, options, callback, ...props }) {
  const keys = Object.keys(filters);
  if (!keys.length) {
    return null;
  }

  function deleteTag(o, k) {
    const newFilters = { ...filters };
    newFilters[o] = newFilters[o].filter(o => o !== k);
    callback(newFilters);
  }

  return <div className="filterbar">
    {
      keys.map(o => {
        const obj = options.find(k => k.key === o);
        return filters[o].length ? <span className="filterbar-item" key={ o }>{ obj.value }: {
          filters[o].map(k => {
            // 如果没有字典，直接显示
            const data = obj.options ? obj.options.find(j => j.value === k) : { text: k };
            return <Tag key={ k } closable onClose={ deleteTag.bind(null, o, k) }>
              { data.text }
            </Tag>;
          })
        }</span> : null;
      })
    }
  </div>;
}
