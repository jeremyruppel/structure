const { expect } = require('chai');
const { entity } = require('../src');

describe('creating an entity class', () => {
  it('adds __isEntity flag to the entity', () => {
    class RawUser {}
    const User = entity({})(RawUser);

    expect(RawUser.__isEntity).to.be.true;
    expect(User.__isEntity).to.be.true;
  });

  it('adds __schema to the entity', () => {
    const schema = { name: String };
    const User = entity(schema)(class User{});

    expect(User.__schema).to.equal(schema);
  });

  describe('entity class is passed as the second parameter', () => {
    context('when entity class has a name', () => {
      it('throws with a message with entity class name', () => {
        expect(() => {
          entity({}, class User {});
        }).to.throw(Error, /^You passed the entity class.*\(User\)`\./);
      });
    });

    context('when entity class is anonymous', () => {
      it('throws with a message with generic entity name', () => {
        expect(() => {
          entity({}, class {});
        }).to.throw(Error, /^You passed the entity class.*\(EntityClass\)`\./);
      });
    });
  });


  describe('using class static methods and properties', () => {
    class RawUser {
      static staticMethod() {
        return 'I am on a static method';
      }
    }

    RawUser.staticProperty = 'I am a static property';

    const User = entity({
      name: String
    })(RawUser);

    it('has access to static methods and properties', () => {
      expect(User.staticMethod()).to.equal('I am on a static method');
      expect(User.staticProperty).to.equal('I am a static property');
    });
  });
});