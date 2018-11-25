export default {
  name: 'Can',
  functional: true,
  props: {
    I: String,
    do: String,
    a: [String, Function],
    of: [String, Function, Object],
    this: [String, Function, Object],
    on: [String, Function, Object],
    not: Boolean,
    passThrough: Boolean,
  },
  render(h, { props, children, parent, data }) {
    const [action, field] = (props.I || props.do || '').split(' ');
    const subject = props.of || props.a || props.this || props.on;

    if (!action) {
      throw new Error('[Vue Can]: neither `I` nor `do` property exist');
    }

    if (!subject) {
      throw new Error('[Vue Can]: neither `of` nor `a` nor `this` nor `on` property exist');
    }

    const allowed = !!(props.not ^ parent.$can(action, subject, field));

    if (!props.passThrough) {
      return allowed ? children : null;
    }

    if (!data.scopedSlots || !data.scopedSlots.default) {
      throw new Error('[Vue Can]: `passThrough` expects default scoped slot to be specified');
    }

    return data.scopedSlots.default({
      allowed,
      ability: parent.$ability,
    });
  }
};
